const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const router = express.Router();

const connection = mysql.createConnection({
    host : 'gunhee0906.cafe24.com',
    user : 'gunhee0906',
    password : 'rjsgml!!4589',
    database : 'fencing'
});

router.use(cors())
router.use(express.json())
router.use(cookieParser());

const JWT_SECRET = '1234';

// 관리자 로그인 : 로그인에 성공하면 jwt 토큰 생성 , 쿠키에 저장
router.post('/login' , async (req , res) => {
    const {id , password} = req.body;

    const sql = `
        SELECT m_id , m_password
        FROM f_managers
        WHERE m_login = ?
    `;
    connection.query(sql , [id] , async (err , result) => {
        if(err || result.length === 0) {
            return res.status(200).json({result : false , msg : '아이디 또는 비밀번호가 잘못되었습니다.'})
        }

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password , user.m_password);
        
        if(!isPasswordValid) {
            return res.status(200).json({
                result : false , msg : '아이디 또는 비밀번호가 잘못되었습니다.'
            })
        }
        
        // 새로운 UUID 생성 ( 20자리 )
        const newUuid = crypto.randomUUID().replace(/-/g, '').slice(0 , 20);

        // m_id 컬럼 업데이트
        const updateSql = `
        UPDATE f_managers
        SET m_id = ?
        WHERE m_login = ?
        `;

        connection.query(updateSql , [newUuid , id] , (err) => {
            if(err) {
                res.status(200).json({result : false , msg : '로그인 중 오류가 발생했습니다. 관리자 요망'})
            }

            const token = jwt.sign({mid : newUuid} , JWT_SECRET , {expiresIn : '1h'});

            res.cookie('token' , token , {
                httpOnly : true , 
                secure : process.env.NODE_ENV === 'production',
                maxAge : 3600000 // 1 hours
            })
            
            // 업데이트된 UUID 반환
            res.status(200).json({
                result : true
            })
        })
    })
})

// 관리자 로그인 검증
router.get(`/info` , async (req , res) => {
    // 쿠키에서 JWT 토큰을 가져옴
    const {token} = req.query;
    console.log(token)

    if(!token) {
        return res.status(200).json({
            result : false , msg : '로그인이 필요합니다.'
        })
    }

    try {
        //JWT 토큰 검증 및 해독
        const decoded = jwt.verify(token , JWT_SECRET);

        const sql = `
        SELECT * FROM f_managers
        WHERE m_id = ?
        `;

        connection.query(sql , [decoded.mid] , async (err , result) => {
            if(err || result.length === 0) {
                return res.status(200).json({
                    result : false , msg : '로그인이 필요합니다.'
                })
            }
            
            return res.status(200).json({
                result : true
            })
        })
    }catch(err) {
        return res.status(200).json({
            result : false , msg : 'Server Error'
        })
    }

});
module.exports = router;