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

module.exports = router;