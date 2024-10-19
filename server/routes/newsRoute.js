const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const router = express.Router();
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host : 'gunhee0906.cafe24.com',
    user : 'gunhee0906',
    password : 'rjsgml!!4589',
    database : 'fencing'
});

router.use(cors())
router.use(express.json())

// 공지사항 리스트 목록
router.get(`/getNews` , async (req, res) => {
    const {page , size , keyword , column , order} = req.query;
    const offset = (page - 1) * size;

    // 허용된 정렬 컬럼을 미리 정의
    const validColumns = ['news_idx', 'news_title', 'news_date', 'view_count'];
    const validOrders = ['ASC', 'DESC'];

    // 입력된 column과 order 값 검증
    const sortColumn = validColumns.includes(column) ? column : 'news_idx';
    const sortOrder = validOrders.includes(order) ? order : 'ASC';

    const sql = `
    SELECT news_idx AS id , news_title AS title , DATE_FORMAT(news_date, '%Y-%m-%d') AS date , view_count AS count
    FROM f_news 
    WHERE news_title LIKE ?
    ORDER BY ${sortColumn} DESC
    LIMIT ? OFFSET ?
    `;
    const sqlCOunt = `
    SELECT COUNT(*) AS totalCount
    FROM f_news
    WHERE news_title LIKE ?
    `;
    connection.query(sqlCOunt , [`%${keyword}%`] , (errCount , countResult) => {
        if(errCount){
            return res.status(500).json({
                result : false ,
                msg : '오류 발생'
            })
        }
        const totalCount = countResult[0]?.totalCount || 0;

        connection.query(sql, [`%${keyword}%`, parseInt(size), parseInt(offset)], (err, result) => {
            if (err) {
                return res.status(500).json({
                    result: false,
                    msg: '공지사항 리스트를 가져오는 중 오류가 발생했습니다.'
                });
            }

            res.status(200).json({
                result: true,
                totalCount,
                news: result
            });
        });
    })
})
// 공지사항 상세보기
router.get('/detail' , async (req , res) => {
    const {id} = req.query;
    const sql = `
    SELECT news_title AS title , news_contents AS contents
    FROM f_news WHERE news_idx = ?
    `;
    connection.query(sql , [id] , async (err , result) => {
        if(err) {
            return res.status(200).json({result : false , msg : '서버 오류가 발생했습니다. 관리자 요망'});
        }
        res.status(200).json({
            result : true , 
            news : result[0]
        })
    })
})

// 공지사항 등록
router.post('/regist' , async (req, res) => {
    const {title , contents} = req.body;
    const sql = `
    INSERT INTO f_news (news_title , news_contents , news_date , news_writer , newst_status , view_count)
    VALUES (? , ? , NOW() , '관리자' , 'Y' , 0)
    `;
    connection.query(sql , [title , contents], async (err , result) => {
        if(err){
            return res.status(200).json({result : false , msg : '서버 오류가 발생했습니다. 관리자 요망'});
        }
        return res.status(200).json({
            result : true
        })
    })
})
// 공지사항 수정
router.post('/modify' , async (req , res) => {
    const {id , title , contents} = req.body;
    const sql = `
    UPDATE f_news
    SET news_title = ? , news_contents = ?
    WHERE news_idx = ?
    `;
    connection.query(sql , [title , contents , id] , (err) => {
        if(err) {
            return res.status(200).json({result : false , msg : '서버 오류가 발생했습니다. 관리자 요망'});
        }
        return res.status(200).json({result : true});
    })
})

// 공지사항 삭제
router.post(`/delete` , async (req, res) => {
    const {id} = req.body;
    const sql = `
    DELETE FROM f_news WHERE news_idx = ?
    `;
    connection.query(sql , [id] , async(err , result) => {
        if(err) {
            return res.status(200).json({result : false , })
        }
        return res.status(200).json({result : true})
    })
})

module.exports = router;