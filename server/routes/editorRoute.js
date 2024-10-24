const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 파일 시스템 모듈 추가

const connection = mysql.createConnection({
    host : 'gunhee0906.cafe24.com',
    user : 'gunhee0906',
    password : 'rjsgml!!4589',
    database : 'fencing'
});

router.use(cors())
router.use(express.json())

const uploadDir = path.join(process.cwd() , 'public/image/editor');

// multer 설정 (파일 저장 경로 및 파일명 생성 방식)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // 파일 저장 경로 지정
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // 유니크한 파일명 생성
    }
});

const upload = multer({ storage: storage });

router.post('/set-image', upload.single('editor'), async (req, res) => {
    try {
        if (req.file) {
            const filePath = `/image/editor/${req.file.filename}`;
            
            // 클라이언트에 이미지 URL을 반환
            res.status(200).json({ message: '파일 업로드 성공', imgUrl: filePath });
        } else {
            res.status(400).json({ message: '파일이 없습니다.' });
        }
    } catch (error) {
        console.error('파일 업로드 중 오류 발생:', error);
        res.status(500).json({ message: '파일 업로드 실패', error: error.message });
    }
});

module.exports = router;