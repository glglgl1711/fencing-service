const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // 기존 mysql2 대신 promise 버전 사용
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// MySQL 연결 설정
const pool = mysql.createPool({
    host: 'gunhee0906.cafe24.com',
    user: 'gunhee0906',
    password: 'rjsgml!!4589',
    database: 'fencing',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

router.use(express.json());
router.use(cookieParser());
router.use(cors({ origin: 'http://localhost:3333', credentials: true }));

// JWT Secret Key
const ACCESS_SECRET = 'access_key';
const REFRESH_SECRET = 'refresh_key';

// 캘린더 조회
router.get('/get-schedule' , async (req ,res) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;
    
        if(!refreshToken) {
            return res.status(200).json({ result : false });
        }
    
        // if(!accessToken) {
        //     return res.status(401).json({ msg : '토큰이 없습니다. 로그인해주세요.' });
        // }
    
        // 토큰 검증
        const decoded = jwt.verify(refreshToken , REFRESH_SECRET);
    
        if(!decoded || !decoded.email) {
            return res.status(403).json({ msg : '유효하지 않은 토큰입니다.' });
        }
    
        const userEmail = decoded.email;
    
        // t_calendar 테이블에서 해당 이메일의 일정 조회DATE_FORMAT(s.s_date, '%Y-%m-%d')
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(
            `SELECT
            c_idx AS id,
            c_title AS title,
            DATE_FORMAT(c_start , '%Y-%m-%d') AS start,
            DATE_FORMAT(c_end , '%Y-%m-%d') AS end,
            c_color AS color,
            c_user_name AS name
            FROM t_calendar WHERE c_user_email = ?`,
            [userEmail]
        );
        connection.release();
    
        return res.status(200).json({ 
            result : true , 
            schedule : rows 
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({msg : 'SERVER error'});
    }
})

// 캘린더 일정 저장
router.post('/set-schedule' , async(req , res) => {
    const {email , name , startDate , endDate , title , description , location , color , major} = req.body;
    const sql = `
        INSERT INTO t_calendar (c_user_email , c_user_name , c_title , c_description , c_start , c_end , c_color , c_major , c_location)
        VALUES (? , ? , ? , ? , ? , ? , ? , ? , ?)
    `;

    try {
        await pool.query(sql , [email , name , title , description , startDate , endDate , color , major , location]);
        res.status(200).json({ result : true })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg : '서버오류' });
    }
})

// 캘린더 일정 상세조회
router.get(`/detail-schedule` , async(req , res) => {
    const {id} = req.query;
    const sql = `
    SELECT 
    c_title AS title ,
    DATE_FORMAT(c_start , '%Y-%m-%d') AS start ,
    DATE_FORMAT(c_end , '%Y-%m-%d') AS end ,
    c_description AS description ,
    c_location AS location,
    c_major AS major ,
    c_color AS color
    FROM t_calendar WHERE c_idx = ?
    `;
    
    try {
        const [rows] = await pool.query(sql , [id]);
        if(rows.length === 0) {
            return res.status(200).json({ msg : '조회되는 일정이 없습니다.' , result : false});
        }
        
        return res.status(200).json({result : true , schedule : rows[0]});
    } catch(err) {
        console.log(err)
    }
})

// 캘린더 일정 수정 ( 전체 수정 )
router.post('/edit-schedule' , async(req ,res) => {
    const {id ,email , name , startDate , endDate , title , description , location , color , major} = req.body;
    const sql = `
    UPDATE t_calendar
    SET c_start = ? , c_end = ? , c_title = ? , c_description = ? , c_location = ? , c_color = ? , c_major = ?
    WHERE c_idx = ?
    `;

    try {
        await pool.query(sql , [startDate , endDate , title , description , location , color , major , id]);
        res.status(200).json({result : true});
    }catch(err) {
        console.log(err)
    }
})

// 캘린더 일정 수정 (날짜 수정)
router.post('/edit-schedule-date' , async (req , res) => {
    const {startDate , endDate , id} = req.body;
    const sql = `
    UPDATE t_calendar
    SET c_start = ? , c_end = ?
    WHERE c_idx = ?
    `;
    try {
        await pool.query(sql , [startDate , endDate , id]);
        res.status(200).json({result : true})
    }catch(err) {
        console.error(err)
    }
})

// 캘린더 일정 삭제
router.post('/delete-schedule' , async (req ,res) => {
    const { id } = req.body;
    const sql = `
    DELETE FROM t_calendar WHERE c_idx = ?
    `;

    try {
        await pool.query(sql , [id]);
        res.status(200).json({result : true})
    }catch (err){
        console.error(err)
    }
})

// 캘린더 아이템 조회
router.get('/get-schedule-item' , async (req ,res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) {
            return res.status(200).json({result : false});
        }

        const decoded = jwt.verify(refreshToken , REFRESH_SECRET);

        if(!decoded || !decoded.email) {
            return res.status(403).json({msg : '유효하지 않은 토큰입니다.'});
        }

        const userEmail = decoded.email;

        const connection = await pool.getConnection();
        const [rows] = await connection.execute(
            `SELECT
            ci_idx AS id ,
            ci_title AS title ,
            ci_color AS color ,
            ci_order AS ci_order
            FROM t_calendar_item WHERE ci_user_email = ?
            `,
            [userEmail]
        );
        connection.release();

        return res.status(200).json({
            result : true ,
            item : rows
        })
    }catch(err){
        console.error(err);
        res.status(500).json({msg : 'SERVER error'})
    }
})

// 캘린더 아이템 저장
router.post('/set-schedule-item' , async(req, res) => {
    const { email , title , color } = req.body;

    const getMaxOrderSql = `
        SELECT MAX(ci_order) AS max_order
        FROM t_calendar_item
        WHERE ci_user_email = ?
    `;

    try {
        const [result] = await pool.query(getMaxOrderSql , [email]);

        const newOrder = result[0].max_order ? result[0].max_order + 1 : 1;

        const sql = `
            INSERT INTO t_calendar_item (ci_user_email , ci_title , ci_color , ci_order)
            VALUES (? , ? , ? , ?)
        `;

        await pool.query(sql , [email , title , color , newOrder]);
        return res.status(200).json({ result : true });
    }catch(error){
        console.error(error);
    }
})

// 캘린더 아이템 삭제
router.post('/delete-schedule-item' , async(req ,res) => {
    const {id} = req.body;
    const sql = `
    DELETE FROM t_calendar_item WHERE ci_idx = ?
    `;

    try { 
        await pool.query(sql , [id]);
        res.status(200).json({result : true})
    }catch(err){
        console.error(err)
    }
})

// 캘린더 아이템 순서 변경
router.post('/edit-schedule-item' , async (req , res) => {
    const { items } = req.body;
    const refreshToken = req.cookies.refreshToken;
    console.log(items)
    if(!refreshToken) {
        return res.status(200).json({result :  false , msg : '사용자를 찾을 수 없습니다.'});
    }
try {

    const decoded = jwt.verify(refreshToken , REFRESH_SECRET);

    const userEmail = decoded.email;

    const connection = await pool.getConnection();

    await connection.beginTransaction(); // 트랜잭션 시작

    for(let i = 0; i < items.length; i++) {
        const {id , ci_order} = items[i];

        const query = `
        UPDATE t_calendar_item
        SET ci_order = ?
        WHERE ci_idx = ? AND ci_user_email = ?
        `;

        await connection.query(query , [ci_order , id , userEmail]);
    }

    await connection.commit(); // 트랜잭션 커밋
    connection.release(); // 연결 반환

    return res.status(200).json({result : true});

}catch (err) {
    console.error(err);
    res.status(500).json({msg : 'SERVER Error'})
}
})

module.exports = router;