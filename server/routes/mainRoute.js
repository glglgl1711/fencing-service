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

// 메인페이지 (뉴스 , 사진첩 리스트)
router.get(`/contents` , async (req , res) => {
    const sqlNews = `
    SELECT news_idx AS id , news_title AS title , DATE_FORMAT(news_date, '%Y-%m-%d') AS date , view_count AS count
    FROM f_news ORDER BY news_date DESC LIMIT 4
    `;
    connection.query(sqlNews , async (err, newsResult) => {
        if(err) {
            return res.status(200).json({result : false, msg : '공지사항을 가져오는 중 오류가 발생하였습니다.'})
        }

        const sqlPhoto = `
        SELECT gallery_idx AS id , gallery_title AS title , gallery_thumnail AS thumnail , DATE_FORMAT(gallery_date, '%Y-%m-%d') AS date
        FROM f_gallery ORDER BY gallery_date DESC LIMIT 2
        `;
        connection.query(sqlPhoto , async (err, photoResult) => {
            if(err) {
                return res.status(200).json({result : false, msg : '사진첩을 가져오는 중 오류가 발생하였습니다.'})
            }

            return res.status(200).json({
                result : true , 
                news : newsResult,
                gallery : photoResult
            })
        })
    })
})


module.exports = router;