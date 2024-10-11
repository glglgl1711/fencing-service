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

// 카카오 로그인 시 , 해당 유저가 DB에 있는 체크
router.get('/getUserCheck', async (req, res) => {
    const { key, token } = req.query;

    // DB에서 모든 사용자 정보 가져오기
    const sql = `
    SELECT u_id FROM f_users
    `;

    connection.query(sql, async (err, result) => {
        if (err) {
            return res.status(500).json({ msg: 'Database error' });
        }

        // DB에서 모든 해시된 u_id 가져오기
        if (result?.length > 0) {
            let userFound = false;
            let userId = null;

            // 모든 사용자의 u_id 해시값과 비교
            for (const row of result) {
                const hashedKey = row.u_id; // DB에서 해시값 가져오기

                // 클라이언트에서 받은 key를 해시화
                const isMatch = await bcrypt.compare(key, hashedKey);

                if (isMatch) {
                    userFound = true; // 유저를 찾음
                    userId = row.u_id; // 해당 유저의 m_id
                    break; // 일치하는 유저를 찾으면 루프 종료
                }
            }

            // 유저가 존재하면 토큰을 업데이트
            if (userFound) {
                // 업데이트
                const updateTokenSql = `
                UPDATE f_users
                SET u_token = ?
                WHERE u_id = ?
                `;
                console.log(userId)
                connection.query(updateTokenSql , [token, userId], (updateErr) => {
                    if(updateErr){
                        return res.status(200).json({
                            result : false,
                            resultMsg : '로그인에 실패하였습니다. 관리자 문의 부탁드립니다.'
                        })
                    }
                    return res.json({result : true})
                });
            } else {
                return res.json({ result: false }); // 유저 없음
            }
        } else {
            return res.json({ result: false }); // 유저 없음
        }
    });
});

// 회원가입
router.post(`/regist`, async (req, res) => {
    const {key , name , phone , addr , birth , email, token} = req.body;
    const hashedKey = await bcrypt.hash(key, 10);
    const sql = `
    INSERT INTO f_users (u_id , u_name , u_phone , u_addr , u_birth , u_email, u_token) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(sql , [hashedKey , name , phone , addr , birth , email, token], (err, result) => {
        if(err) {
            return res.status(500).json({ msg: 'error' })
        }
        return res.json({ result: true });
    })
})

// 유저 데이터 유지 -> 클라이언트에서 다루는 데이터
router.get(`/users` , async (req, res) => {
    const {token} = req.query;
    const sql = `
        SELECT * FROM f_users WHERE u_token = ?
    `;
    connection.query(sql , [token] ,  async (err , result) => {
        if(err) {
            return res.status(200).json({
                result : false
            })
        }
        if(result?.length > 0) {
            return res.status(200).json({
                result : true ,
                users : result[0]
            })
        }else{
            return res.status(200).json({
                result : false
            })
        }
    })
})

module.exports = router;