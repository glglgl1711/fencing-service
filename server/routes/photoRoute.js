const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 파일 시스템 모듈 추가
const sharp = require('sharp'); // sharp 모듈 추가

const connection = mysql.createConnection({
    host : 'gunhee0906.cafe24.com',
    user : 'gunhee0906',
    password : 'rjsgml!!4589',
    database : 'fencing'
});

router.use(cors())
router.use(express.json())

// 저장할 디렉토리 경로
const uploadDir = path.join(process.cwd(), 'public/image/photos');

// 디렉토리가 존재하지 않으면 생성
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// multer 설정 (파일 저장 경로 및 파일명 생성 방식)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // 위에서 확인한 경로로 저장
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // 유니크한 파일명 생성
    }
});

const upload = multer({storage : storage});

// 사진첩 리스트
router.get('/getPhotos' , async (req, res) => {
    const {page , size , keyword , column , order} = req.query;
    const offset = (page - 1) * size;
    // 허용된 정렬 컬럼을 미리 정의
    const validColumns = ['gallery_idx', 'gallery_title', 'gallery_date', 'view_count'];
    const validOrders = ['ASC', 'DESC'];

    // 입력된 column과 order 값 검증
    const sortColumn = validColumns.includes(column) ? column : 'gallery_idx';
    const sortOrder = validOrders.includes(order) ? order : 'ASC';

    const sql = `
    SELECT gallery_idx AS id , gallery_title AS title, gallery_thumnail AS thumnail , DATE_FORMAT(gallery_date , '%Y-%m-%d') AS date , view_count AS count
    FROM f_gallery
    WHERE gallery_title LIKE ?
    ORDER BY ${sortColumn} DESC
    LIMIT ? OFFSET ?
    `;
    const sqlCount = `
    SELECT COUNT(*) AS totalCount
    FROM f_gallery
    WHERE gallery_title LIKE ?
    `;
    connection.query(sqlCount , [`%${keyword}%`] , (errCount , countResult) => {
        if(errCount) {
            return res.status(200).json({
                result : false , msg : '리스트 갯수를 가져오는데 실패하였습니다.'
            })
        }
        const totalCount = countResult[0].totalCount || 0;

        connection.query(sql , [`%${keyword}%`, parseInt(size), parseInt(offset)], (err , result) => {
            if(err) {
                return res.status(200).json({
                    result : true , msg : '사진첩 리스트를 가져오는 중 오류가 발생했습니다.'
                });
            }
            res.status(200).json({
                result : true , totalCount , photos : result
            })
        })
    })
})
// 사진첩 등록
router.post('/regist' , upload.fields([{ name: 'file', maxCount: 50 }, { name: 'thumnail' }]), async (req , res) => {
    const {title} = req.body;
    const files = req.files.file; // 여러 파일
    const thumnail = req.files.thumnail ? req.files.thumnail[0] : null; // 단일 썸네일 파일

    try {

        let thumnailUrl = null;
        if (thumnail) {
            // 썸네일 리사이징 및 저장
            const thumnailPath = path.join(uploadDir, thumnail.filename);
            const resizedThumnailPath = path.join(uploadDir, 'resized_' + thumnail.filename);
            
            await sharp(thumnailPath)
                .resize(360, 250) // 리사이즈 (360x250)
                .toFile(resizedThumnailPath); // 리사이즈된 썸네일을 저장
            
            // 원본 썸네일 삭제 (필요한 경우)
            // fs.unlinkSync(thumnailPath);

            thumnailUrl = `/image/photos/resized_${thumnail.filename}`;
        }

        const insertGalleryQuery = `INSERT INTO f_gallery (gallery_title , gallery_date , gallery_writer, view_count, gallery_thumnail) VALUES (? , NOW() , '관리자', 0 , ?)`;
        connection.query(insertGalleryQuery , [title , thumnailUrl] , (err , galleryResult) => {
            if(err) {
                return res.status(200).json({result : false , msg : '서버에서 제목 저장하는데 실패하였습니다.'});
            }
            const galleryIdx = galleryResult.insertId;

            const photoInsertQueries = files.map(file => {
                const photoUrl = `/image/photos/${file.filename}`;
                const photoName = file.originalname;
                return new Promise((resolve , reject) => {
                    const insertPhotoQuery = `INSERT INTO f_gallery_photos (photo_gallery , photo_url , photo_name) VALUES (? , ? , ?)`;
                    connection.query(insertPhotoQuery , [galleryIdx , photoUrl , photoName] , (err, photoResult) => {
                        if(err) {
                            reject(err)
                        } else{
                            resolve(photoResult)
                        }
                    })
                })
            });
            // 모든 이미지 삽입 완료 후 응답
            Promise.all(photoInsertQueries)
            .then(() => res.status(200).json({ result : true }))
            .catch(error => {
                console.error(error);
                res.status(500).json({ result : false , msg: '사진 저장에 실패했습니다.' });
            });
        })
    }catch{
        console.error(error);
        res.status(500).json({ result : false ,message: 'Server error.' });
    }
})

//사진첩 상세보기 
router.get('/detail' , async (req, res) => {
    const {id} = req.query;
    const sql = `
        SELECT
            g.gallery_title AS title,
            g.gallery_thumnail AS thumnail,
            p.photo_idx,
            p.photo_url,
        (SELECT gallery_idx FROM f_gallery WHERE gallery_idx < ? ORDER BY gallery_idx DESC LIMIT 1) AS next,
        (SELECT gallery_idx FROM f_gallery WHERE gallery_idx > ? ORDER BY gallery_idx DESC LIMIT 1) AS prev
        FROM f_gallery g
        LEFT JOIN
            f_gallery_photos p ON g.gallery_idx = p.photo_gallery
        WHERE
            g.gallery_idx = ?
    `;
    connection.query(sql , [id, id, id] , (err , result) => {
        if(err) { return res.status(200).json({result : false , msg : '서버 오류가 발생하였습니다.'})}

        // 갤러리가 존재하지 않을 경우
        if(result?.length === 0) {
            return res.status(200).json({result : false , msg : '사진첩이 존재하지 않습니다.'});
        }
        // 타이틀과 썸네일을 분리
        const {title , thumnail, prev , next} = result[0];

        // 사진들을 배열로 처리 ( url 이 존재하는 값만 리턴 )
        const photos = result.map(photo => ({
            id : photo.photo_idx ,
            url : photo.photo_url,
        })).filter(photo => photo.url)

        return res.status(200).json({
            result : true ,
            title : title, thumnail : thumnail,
            photo : photos,
            prev : prev,
            next : next
        });
    })
})

// 사진첩 수정
router.post('/edit' , upload.fields([{name : 'file' , maxCount : 50}, {name : 'thumnail'}]) , async (req , res) => {
    const {id , title} = req.body;
    const files = req.files.file;
    const thumnail = req.files.thumnail ? req.files.thumnail[0] : null;

    try {
        let updateQueries = [];
        let updateParams = [];

        // 제목 업데이트
        if (title) {
            updateQueries.push(`gallery_title = ?`);
            updateParams.push(title);
        }

        // 썸네일 업데이트
        if (thumnail) {
            // 썸네일 리사이징 및 저장
            const thumnailPath = path.join(uploadDir, thumnail.filename);
            const resizedThumnailPath = path.join(uploadDir, 'resized_' + thumnail.filename);

            await sharp(thumnailPath)
                .resize(360, 250) // 360x250으로 리사이즈
                .toFile(resizedThumnailPath); // 리사이즈된 이미지를 저장

            // 원본 썸네일 삭제 (필요한 경우 - 이거 사용하면 파일권한 이슈 문제가 생김)
            // fs.unlinkSync(thumnailPath);

            const thumnailUrl = `/image/photos/resized_${thumnail.filename}`;
            updateQueries.push(`gallery_thumnail = ?`);
            updateParams.push(thumnailUrl);
        }

        // 파일 업데이트가 있는 경우 처리
        if (files && files.length > 0) {
            const photoInsertQueries = files.map(file => {
                const photoUrl = `/image/photos/${file.filename}`;
                const photoName = file.originalname;
                return new Promise((resolve, reject) => {
                    const insertPhotoQuery = `INSERT INTO f_gallery_photos (photo_gallery, photo_url, photo_name) VALUES (?, ?, ?)`;
                    connection.query(insertPhotoQuery, [id, photoUrl, photoName], (err, photoResult) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(photoResult);
                        }
                    });
                });
            });

            // 사진 삽입 완료 후 응답
            await Promise.all(photoInsertQueries);

            console.log(updateQueries)
        }

        // 업데이트 쿼리 작성
        if (updateQueries.length > 0) {
            const updateQuery = `UPDATE f_gallery SET ${updateQueries.join(', ')} WHERE gallery_idx = ?`;
            updateParams.push(id); // 마지막에 ID 추가
            connection.query(updateQuery, updateParams, (err, result) => {
                if (err) {
                    return res.status(500).json({ result: false, msg: '서버에서 업데이트 중 오류가 발생했습니다.' });
                }

                return res.status(200).json({ result: true});
            });
        } else {
            // 수정할 내용이 없는 경우
            return res.status(400).json({ result: false, msg: '수정할 내용이 없습니다.' });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ result: false, message: '서버 오류.' });
    }
})

// 사진첩 리스트 삭제
router.post('/delete' , async (req , res) => {
    const {id} = req.body;
    const sql = `
    DELETE FROM f_gallery WHERE gallery_idx = ?
    `;
    connection.query(sql , [id] , (err, result) => {
        if(err) { return res.status(200).json({result : false , msg: '삭제 중 오류가 발생했습니다. 관리자 요망'})}
        return res.status(200).json({ result : true })
    })
})

// 사진첩 부분 사진 삭제
router.post('/delete-photo' , async (req, res) => {
    const {id} = req.body;
    const getPhotoQuery = `
    SELECT photo_url FROM f_gallery_photos WHERE photo_idx = ?
    `;
    connection.query(getPhotoQuery , [id] , (err, photoResult) => {
        if(err || photoResult.length === 0) {
            return res.status(200).json({
                result : false , msg : '사진이 정보를 찾을 수 없습니다.'
            })
        }
        const photoUrl = photoResult[0].photo_url;
        // 루트 페이지 public / 만약 server 내 public 있다면 ../public
        const photoPath = path.join(__dirname , '../../public' , photoUrl);

        const sql = `
        DELETE FROM f_gallery_photos
        WHERE photo_idx = ?
        `;

        connection.query(sql , [id] , (err, result) => {
            if(err) {return res.status(200).json({result : false , msg : '삭제에 실패했습니다. 관리자 요망'})}
            
            fs.unlink(photoPath , (err) => {
                if(err) {
                    return res.status(200).json({result : false , msg : '삭제 중 오류가 발생했습니다. 관리자 요망'})
                }
                return res.status(200).json({ result : true })
            })
        })
    })
    
})

module.exports = router;