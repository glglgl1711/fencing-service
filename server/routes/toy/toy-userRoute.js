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

// Access token 생성
const generateAccessToken = (user) => {
    return jwt.sign(
        {email : user.user_email , name : user.user_name} ,
        ACCESS_SECRET ,
        {expiresIn : '1h'}
    )
}

// Refresh Token 생성
const generateRefreshToken = (user) => {
    return jwt.sign(
        {email : user.user_email} ,
        REFRESH_SECRET ,
        {expiresIn : '7d'}
    )
}

// 로그인 API
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Prepard Statement 방식 사용 : email 값이 자동으로 escape 처리되므로 SQL Injection 공격이 불가능
    const sql = `SELECT * FROM t_users WHERE user_email = ?`;

    try {
        const [rows] = await pool.query(sql, [email]);
        if (rows.length === 0) {
            return res.status(401).json({ msg: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.user_password);
        if (!isMatch) {
            return res.status(401).json({ msg: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // refresh token 데이터 베이스에 저장
        await pool.query('UPDATE t_users SET user_token = ? WHERE user_email = ?' , [refreshToken , email])

        // Access token -> HttpOnly , Secure 쿠키로 저장
        // Refresh token -> HttpOnly , Secure 쿠키로 저장
        res.cookie('accessToken' , accessToken , {
            httpOnly : true ,
            secure : process.env.NODE_ENV === 'production',
            sameSite : 'strict',
            maxAge: 15 * 60 * 1000
        })

        res.cookie('refreshToken' , refreshToken , {
            httpOnly : true , 
            secure : process.env.NODE_ENV === 'production',
            sameSite : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000 // 7일
        }) 

        // 단일 JWT 토큰 생성
        // const token = jwt.sign(
        //     { email: user.user_email, name: user.user_name }, // JWT 토큰 생성 데이터
        //     '1234', // JWT 키 값
        //     { expiresIn: '1h' } // 유효시간
        // );
        // 단일 토큰 방식
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     maxAge: 60 * 60 * 1000
        // });

        res.json({ result: true, msg: '로그인 성공' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '서버 오류' });
    }
});

// 유저 정보 조회
router.get('/me', async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // refresh 토큰이 없을 경우 , 로그아웃으로 간주
    if(!refreshToken) {
        return res.status(200).json({ result : false })
    }

    if (!accessToken) {
        return res.status(401).json({ msg: '토큰이 없습니다. 로그인해주세요.' });
    }

    jwt.verify(accessToken, ACCESS_SECRET, async (err, decoded) => {
        if (!err) {
            try {
                // DB에서 user_phone 조회
                const [rows] = await pool.query('SELECT user_phone FROM t_users WHERE user_email = ?', [decoded.email]);

                if (rows.length === 0) {
                    return res.status(404).json({ msg: '사용자를 찾을 수 없습니다.' });
                }

                return res.json({ 
                    result : true ,
                    user : {
                        email: decoded.email, 
                        name: decoded.name, 
                        phone: rows[0].user_phone
                    }
                });

            } catch (error) {
                console.error(error);
                return res.status(500).json({ msg: '서버 오류' });
            }
        }

        if (!refreshToken) {
            return res.status(401).json({ msg: '로그인이 필요합니다.' });
        }

        try {
            const [rows] = await pool.query('SELECT * FROM t_users WHERE user_token = ?', [refreshToken]);
            if (rows.length === 0) {
                return res.status(401).json({ msg: '유효하지 않은 토큰입니다. 다시 로그인하세요.' });
            }

            jwt.verify(refreshToken, REFRESH_SECRET, async (err, decoded) => {
                if (err) return res.status(401).json({ msg: '토큰이 만료되었습니다. 다시 로그인하세요.' });

                const newAccessToken = generateAccessToken(rows[0]);

                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 15 * 60 * 1000,
                });

                res.json({
                    result : true ,
                    user : {
                        email: rows[0].user_email, 
                        name: rows[0].user_name, 
                        phone: rows[0].user_phone
                    }
                });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: '서버 오류' });
        }
    });
});

// 토큰 재발급 API
router.post('/refresh' , async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) {
        return res.status(403).json({ msg : '토큰이 존재하지 않습니다.' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM t_users WHERE user_token = ?' , [refreshToken]);
        if(rows.length === 0) {
            return res.status(403).json({ msg : '유효하지 않은 토큰입니다.' });
        }

        jwt.verify(refreshToken, REFRESH_SECRET , async(err , decoded) => {
            if(err) return res.status(403).json({ msg : '토큰이 만료되었습니다.'});

            const newAccessToken = generateAccessToken(rows[0]);

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000,
            });

            res.json({ result : true , msg : '토큰 재발급 완료' });
        });
    }catch(error) {
        console.error(error);
        res.status(500).json({msg : '서버 오류'});
    }
})

// 로그이웃 API (Refresh Token 무효화)
router.post('/logout' , async(req, res) => {
    const refreshToken = req.cookies.refreshToken;

    try {
        if(refreshToken) {
            await pool.query('UPDATE t_users SET user_token = NULL WHERE user_token = ?' , [refreshToken]);
        }
        res.clearCookie('refreshToken');
        res.json({result : true , msg : '로그아웃 완료'});
    }catch (error){
        console.error(error);
        res.status(500).json({ msg : '서버 오류' })
    }
})

// 🔹 이메일 중복검사 API
router.get('/check', async (req, res) => {
    const { email } = req.query;
    const sql = `SELECT user_email FROM t_users WHERE user_email = ?`;

    try {
        const [result] = await pool.query(sql, [email]);
        if (result.length > 0) {
            res.status(200).json({ result: false, msg: '아이디가 중복됩니다.' });
        } else {
            res.status(200).json({ result: true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: false, msg: '서버 오류가 발생했습니다.' });
    }
});

// 🔹 회원가입 API
router.post('/regist', async (req, res) => {
    const { email, password, name, phone, gender } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
        INSERT INTO t_users (user_email, user_password, user_name, user_phone, user_gender, user_date, user_status) 
        VALUES (?, ?, ?, ?, ?, NOW(), 'Y')
    `;

    try {
        await pool.query(sql, [email, hashedPassword, name, phone, gender]);
        res.status(200).json({ result: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: '서버 오류' });
    }
});

module.exports = router;

// httpOnly : document.cookie 로 접근 불가 , 즉 JS에서 접근이 불가능 (XSS 공격 방지)
// secure : true 일 때만 토큰 저장 , 예외적으로 크롬환경에서는 localhost 에도 저장시켜준다.
// sameSite : 같은 사이트 안에서만 쿠키 전송 가능 (CSRF 방지) , strict > lax > none 순으로 보안이 강함
// maxAge : 만료 시간

// 단일 토큰 방식 (보안상 이슈 없고 , 간단한 API에서 적합)
// 장점 : 구현이 간단 , API 호출 시 검증 과정이 단순함
// 단점 : 토큰이 만료 시 재 로그인을 해야 함 , 토큰이 탈취되면 재로그인전까지 악용 가능

// Access token & Refresh token (보안성이 중요하고 , 사용자의 로그인 유지가 필요할 때 적합)
// 장점 : 보안성이 높음 -> Access 토큰이 유출되도 Refresh token 이 없으면 새로운 Access token 을 받을 수 없음
// Access token 이 만료되어도 자동으로 새로운 Access token을 발급 가능 (재로그인이 불필요해진다.)
// 단점 : 구현이 복잡해짐 , 서버 부하가 증가할 수 있다.

// 웹
// Access Token → 메모리 (React 상태, Redux 등)
// Refresh Token → HttpOnly + Secure 쿠키

// 모바일
// Access Token & Refresh Token → 보안 저장소 (Secure Storage, Keychain)