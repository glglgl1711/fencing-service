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

// 봉사 등록 (관리자)
router.post('/regist' , async (req, res) => {
    const {title , contents , applyDate , serviceDate , registrar , agency , location , appliPeople , recruitmentPeople,
        serviceTime , managerName , managerPhone , managerEmail
    } = req.body;
    
    const sql = `
        INSERT INTO f_service (s_title , s_contents, s_apply_date , s_service_date , s_registrar , s_agency , s_location , s_service_time, s_appli_people , s_recruitment_people , s_manager_name , s_manager_phone , s_manager_email , s_status , s_date)
        VALUES ( ?, ? , ? , ? , ? , ? , ? , ? , ? , ? ,? ,? , ? , 'Y' , NOW())
    `;
    connection.query(sql , [title , contents , applyDate , serviceDate , registrar , agency , location , serviceTime, appliPeople , recruitmentPeople, managerName , managerPhone , managerEmail], async(err, result) => {
        if(err) {
            return res.status(200).json({result : false , msg : '등록에 실패하였습니다. 관리자 요망'});
        }
        return res.status(200).json({result : true})
    })
})

// 봉사 리스트 (관리자)
router.get(`/getService` , async (req, res) => {
    const {page , size , keyword , column , order} = req.query;
    const offset = (page - 1) * size;
    // 허용된 정렬 컬럼을 미리 정의
    const validColumns = ['s_date'];
    const validOrders = ['ASC', 'DESC'];

    // 입력된 column과 order 값 검증
    const sortColumn = validColumns.includes(column) ? column : 'news_idx';
    const sortOrder = validOrders.includes(order) ? order : 'ASC';
    const sql = `
    SELECT s_idx AS id , s_title AS title , s_registrar AS registrar , s_agency AS agency , s_status AS status , DATE_FORMAT(s_date, '%Y-%m-%d') AS date, s_apply_date AS applyDate , s_service_date AS serviceDate , s_service_time AS serviceTime
    FROM f_service
    WHERE s_title LIKE ?
    ORDER BY ${sortColumn} DESC
    LIMIT ? OFFSET ?
    `;
    const sqlCount = `
    SELECT COUNT(*) AS totalCount
    FROM f_service
    WHERE s_title LIKE ?
    `;
    connection.query(sqlCount , [`%${keyword}%`] , (errCount , countResult) => {
        if(errCount) {
            return res.status(200).json({result : false , msg : '리스트 개수를 가져오는데 실패하였습니다.'});
        }
        const totalCount = countResult[0].totalCount || 0;

        connection.query(sql , [`%${keyword}%`, parseInt(size) , parseInt(offset)] , (err, result) => {
            if(err) {
                return res.status(200).json({result : false, msg : '리스트를 가져오는데 실패하였습니다.'});
            }
            // 서비스 시간 계산 함수
            const calculateDuration = (serviceTime) => {
                const [startTime, endTime] = serviceTime.split(' ~ ');
                const start = new Date(`1970-01-01T${startTime}:00`);
                const end = new Date(`1970-01-01T${endTime}:00`);
                return (end - start) / (1000 * 60 * 60);  // 시간 단위로 변환
            };

            // 각 서비스 시간에 대해 시간 차이를 계산하여 추가
            const serviceList = result.map((service) => {
                const duration = calculateDuration(service.serviceTime) || '-';
                return {
                    ...service,
                    duration: `${duration}`
                };
            });

            return res.status(200).json({
                result : true , 
                service : serviceList ,
                totalCount : totalCount ,
            })
        })
    })
})

// 봉사 상세조회 (관리자)
router.get(`/detail`, async (req, res) => {
    const {id} = req.query;
    const sql = `
    SELECT
        s.s_idx AS id,
        s.s_title AS title, 
        s.s_contents AS contents, 
        s.s_apply_date AS applyDate, 
        s.s_service_date AS serviceDate, 
        s.s_registrar AS registrar,
        s.s_agency AS agency, 
        s.s_location AS location, 
        s.s_service_time AS serviceTime, 
        COUNT(u.su_service) AS appliPeople, -- 신청자 명 수 가져오기
        s.s_recruitment_people AS recruitmentPeople,
        s.s_manager_name AS managerName, 
        s.s_manager_phone AS managerPhone, 
        s.s_manager_email AS managerEmail, 
        s.s_status AS status
    FROM f_service s
    LEFT JOIN f_service_user u ON s.s_idx = u.su_service
    WHERE s.s_idx = ?
    GROUP BY s.s_idx
    `;
    connection.query(sql , [id] , async (err , result) => {
        if(err) {
            return res.status(200).json({result : false , msg : '상세조회에 실패하였습니다.'})
        }

        if(result.length > 0) {
            const splitAppliyDate = result[0].applyDate.split(' ~ ');
            const splitServiceDate = result[0].serviceDate.split(' ~ ');
            const splitServiceTime = result[0].serviceTime.split(' ~ ');
            return res.status(200).json({
                result : true ,
                service : {
                    title : result[0].title,
                    id : result[0].id,
                    contents : result[0].contents,
                    applyDate1 : splitAppliyDate[0] || '',
                    applyDate2 : splitAppliyDate[1] || '',
                    serviceDate1 : splitServiceDate[0] || '',
                    serviceDate2 : splitServiceDate[1] || '',
                    serviceTime1 : splitServiceTime[0] || '',
                    serviceTime2 : splitServiceTime[1] || '',
                    status : result[0].status,
                    registrar : result[0].registrar,
                    agency : result[0].agency, location : result[0].location,
                    appliPeople : result[0].appliPeople, 
                    recruitmentPeople : result[0].recruitmentPeople,
                    managerName : result[0].managerName , 
                    managerPhone : result[0].managerPhone, managerEmail : result[0].managerEmail
                }
            })
        }
    })
})

// 봉사 선칭 유저 상세 리스트 (관리자)
router.get(`/getUser-service-list`, async (req, res) => {
    const {service , keyword} = req.query;
    const sql = `
    SELECT
        s.su_idx AS id,
        s.su_user AS user,
        u.u_name AS name,
        u.u_phone AS phone,
        s.su_status AS status
    FROM
        f_service_user s
    JOIN f_users u ON s.su_user = u.u_idx
    WHERE s.su_service = ? AND u.u_name LIKE ?
    `;

    connection.query(sql , [service , `%${keyword}%` ] , (err ,result) => {
        if(err) {
            return res.status(200).json({result : false , msg : '서버 오류가 발생했습니다. 관리자요망'})
        }
        return res.status(200).json({
            result : true , list : result
        })
    })
})

// 봉사 신청 유저 상태 변경 (단일)
router.post(`/edit-user-service-status` , async (req, res) => {
    const {service , user , status} = req.body;
    const sql  = `
    UPDATE f_service_user
    SET su_status = ?
    WHERE su_service = ? AND su_user = ?
    `;
    connection.query(sql , [status, service , user] , async (err , result) => {
        if(err) {
            return res.status(200).json({result : false , msg : '서버에 오류가 발생했습니다. 관리자 요망'})
        }
        return res.status(200).json({ result : true })
    })
})

// 봉사 신청 유저 상태 변경 (전체)
router.post(`/edit-groups-service-status` , async (req , res) => {
    const {service , users , status} = req.body;
    const sql = `
    UPDATE f_service_user
    SET su_status = ?
    WHERE su_service = ?
    AND su_user IN (?) -- 배열의 값을 한번에 주입 
    `;
    connection.query(sql , [status , service , users] , (err, result) => {
        if(err){
            return res.status(200).json({result : false, msg: '상태변경 중 오류가 발생했습니다. 관리자 요망'})
        }
        return res.status(200).json({
            result : true ,
            msg : `${result.affectedRows} 명의 상태가 성공적으로 변경되었습니다.`
        })
    })
})

// 봉사 신청 유저 삭제 (단일)
router.post(`/delete-service-user` , async (req, res) => {
    const {service , user} = req.body;
    const sql = `
    DELETE FROM f_service_user
    WHERE su_service = ? AND su_user = ?
    `;
    connection.query(sql , [service , user] , async (err) => {
        if(err) {
            return res.status(200).json({result : false, msg: '삭제 중 오류가 발생했습니다. 관리자 요망'})
        }
        return res.status(200).json({result : true})
    })  
})

// 봉사 신청 유저 삭제 (일괄)
router.post(`/delete-groups-service` , async (req, res) => {
    const {service , users} = req.body;

    const sql = `
    DELETE FROM f_service_user
    WHERE su_service = ? AND su_user IN (?)
    `;
    connection.query(sql , [service , users] , async (err , result) => {
        if(err) {
            return res.status(200).json({ result : false , msg : '일괄 삭제 중 오류가 발생했습니다. 관리자 요망'})
        }
        return res.status(200).json({ result : true })
    })
})

// 봉사 리스트 (사용자)
router.get(`/get-user-service` , async (req , res) => {
    const { page , size , keyword , column , order , user } = req.query;
    const offset = (page - 1) * size;
    const validColumns = ['s_date'];
    const validOrders = ['ASC', 'DESC'];
    const sortColumn = validColumns.includes(column) ? column : 'news_idx';
    const sortOrder = validOrders.includes(order) ? order : 'DESC';

    const sql = `
    SELECT
        s.s_idx AS id,
        s.s_title AS title,
        s.s_registrar AS registrar,
        s.s_agency AS agency,
        s.s_status AS status,
        DATE_FORMAT(s.s_date, '%Y-%m-%d') AS date,
        s.s_apply_date AS applyDate,
        s.s_service_date AS serviceDate,
        s.s_service_time AS serviceTime,
        CASE WHEN u.su_user IS NOT NULL THEN 'Y' ELSE 'N' END AS isApply
    FROM f_service s
    LEFT JOIN f_service_user u ON s.s_idx = u.su_service AND u.su_user = ?
    WHERE s.s_title LIKE ?
    ORDER BY ${sortColumn} DESC
    LIMIT ? OFFSET ?
    `;
    
    const sqlCount = `
    SELECT COUNT(*) AS totalCount
    FROM f_service
    WHERE s_title LIKE ?
    `;

    connection.query(sqlCount, [`%${keyword}%`], (errCount, countResult) => {
        if (errCount) {
            return res.status(200).json({result: false, msg: '리스트 개수를 가져오는데 실패하였습니다.'});
        }
        const totalCount = countResult[0].totalCount || 0;

        connection.query(sql, [user, `%${keyword}%`, parseInt(size), parseInt(offset)], (err, result) => {
            if (err) {
                return res.status(200).json({result: false, msg: '리스트를 가져오는데 실패하였습니다.'});
            }

            // 서비스 시간 계산 함수
            const calculateDuration = (serviceTime) => {
                const [startTime, endTime] = serviceTime.split(' ~ ');
                const start = new Date(`1970-01-01T${startTime}:00`);
                const end = new Date(`1970-01-01T${endTime}:00`);
                return (end - start) / (1000 * 60 * 60);  // 시간 단위로 변환
            };

            // 각 서비스 시간에 대해 시간 차이를 계산하여 추가
            const serviceList = result.map((service) => {
                const duration = calculateDuration(service.serviceTime) || '-';
                return {
                    ...service,
                    duration: `${duration}`
                };
            });

            return res.status(200).json({
                result: true,
                service: serviceList,
                totalCount: totalCount,
            });
        });
    });
});

// 봉사 상세조회 (사용자)
router.get(`/detail-user-service`, async (req, res) => {
    const {id , user} = req.query;
    const sql = `
    SELECT
        s.s_idx AS id,
        s.s_title AS title, 
        s.s_contents AS contents, 
        s.s_apply_date AS applyDate, 
        s.s_service_date AS serviceDate, 
        s.s_registrar AS registrar,
        s.s_agency AS agency, 
        s.s_location AS location, 
        s.s_service_time AS serviceTime, 
        COUNT(u.su_service) AS appliPeople, -- 신청자 명 수 가져오기
        s.s_recruitment_people AS recruitmentPeople,
        s.s_manager_name AS managerName, 
        s.s_manager_phone AS managerPhone, 
        s.s_manager_email AS managerEmail, 
        s.s_status AS status,
        CASE WHEN u.su_user IS NOT NULL THEN 'Y' ELSE 'N' END AS isApply -- 신청 여부 확인
    FROM f_service s
    LEFT JOIN f_service_user u ON s.s_idx = u.su_service AND u.su_user = ? -- user에 따른 신청 확인
    WHERE s.s_idx = ?
    GROUP BY s.s_idx
    `;
    connection.query(sql , [user , id] , async (err , result) => {
        if(err) {
            return res.status(200).json({result : false , msg : '상세조회에 실패하였습니다.'})
        }

        if(result.length > 0) {
            const splitAppliyDate = result[0].applyDate.split(' ~ ');
            const splitServiceDate = result[0].serviceDate.split(' ~ ');
            const splitServiceTime = result[0].serviceTime.split(' ~ ');
            return res.status(200).json({
                result : true ,
                service : {
                    title : result[0].title,
                    id : result[0].id,
                    contents : result[0].contents,
                    applyDate1 : splitAppliyDate[0] || '',
                    applyDate2 : splitAppliyDate[1] || '',
                    serviceDate1 : splitServiceDate[0] || '',
                    serviceDate2 : splitServiceDate[1] || '',
                    serviceTime1 : splitServiceTime[0] || '',
                    serviceTime2 : splitServiceTime[1] || '',
                    status : result[0].status,
                    registrar : result[0].registrar,
                    agency : result[0].agency, location : result[0].location,
                    appliPeople : result[0].appliPeople, 
                    recruitmentPeople : result[0].recruitmentPeople,
                    managerName : result[0].managerName , 
                    managerPhone : result[0].managerPhone, managerEmail : result[0].managerEmail,
                    isApply : result[0].isApply
                }
            })
        }
    })
})


// 봉사 신청하기 (사용자)
router.post('/apply' , async (req, res) => {
    const {user , service} = req.body;
    
    const findSql = `
    SELECT * FROM f_service_user WHERE su_service = ? AND su_user = ?
    `;

    connection.query(findSql , [service , user] , async(err, result) => {
        if(err) {
            return res.status(200).json({result : false, msg : '서버오류가 발생했습니다. 관리자 요망'})
        }
        if(result?.length === 0) {
            const sql = `
            INSERT INTO f_service_user (su_service , su_user , su_status , su_date)
            VALUES ( ? , ? , 'N' , NOW())
            `;
            connection.query(sql , [service , user] , async (err , result) => {
                if(err) {
                    return res.status(200).json({result : false , msg : '신청하는 중 오류가 발생했습니다. 관리자 요망'})
                }
                return res.status(200).json({result : true})
            })
        }else {
            return res.status(200).json({result : false , msg : '이미 신청이 되어있습니다.'})
        }
    })
})

// 봉사 신청 취소하기 (사용자)
router.post('/apply-cancel' , async (req, res) => {
    const {user , service} = req.body;
    const sql = `
    DELETE FROM f_service_user
    WHERE su_user = ? AND su_service = ?
    `;
    connection.query(sql , [user , service] , async(err , result) => {
        if(err) {
            return res.status(200).json({result : false , msg : '서버 오류가 발생했습니다. 관리자 요망'})
        }
        return res.status(200).json({result : true})
    })
})

// 봉사 모집 & 마감 변경
router.post(`/status` , async(req , res) => {
    const {id , status} = req.body;
    const sql = `
    UPDATE f_service
    SET s_status = ? WHERE s_idx = ?
    `;
    connection.query(sql , [status , id] , async (err) => {
        if(err) {
            return res.status(200).json({result : false , msg : '상태변경에 오류가 발생했습니다. 관리자 요망'})
        }
        return res.status(200).json({result : true})
    })
})

// 봉사 수정
router.post(`/edit` , async (req, res) => {
    const {id, title , contents , applyDate , serviceDate , registrar , agency , location , appliPeople , recruitmentPeople,
        serviceTime , managerName , managerPhone , managerEmail
    } = req.body;

    const sql = `
    UPDATE f_service
    SET s_title = ? , s_contents = ? , s_apply_date = ? , s_service_date = ? , s_registrar = ? , s_agency = ? , s_location = ? , s_appli_people = ? , s_recruitment_people = ? , s_service_time = ? , s_manager_name = ? , s_manager_phone = ? , s_manager_email = ? 
    WHERE s_idx = ?
    `;
    connection.query(sql , [title , contents , applyDate , serviceDate , registrar , agency , location , appliPeople , recruitmentPeople , serviceTime , managerName , managerPhone , managerEmail , id] , (err) => {
        if(err) {
            return res.status(200).json({result : false , msg : '수정에 실패하였습니다. 관리자 요망'})
        }
        return res.status(200).json({ result : true })
    })
})

// 봉사 삭제
router.post('/delete', async (req , res) => {
    const {id} = req.body;
    const sql = `
    DELETE FROM f_service WHERE s_idx = ?
    `;
    connection.query(sql , [id] , async (err) => {
        if(err) {
            return res.status(200).json({result : false , msg : '삭제 중 오류가 발생했습니다. 관리자 요망'})
        }
        return res.status(200).json({result : true})
    })
})

module.exports = router;