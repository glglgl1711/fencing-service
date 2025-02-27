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

router.use(cors());
router.use(express.json());

// 파일 저장 디렉토리
const uploadDir = '/var/www/uploads/editor';

// 디렉토리가 존재하지 않으면 생성
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

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

// 이미지 업로드 엔드포인트
router.post('/set-image', upload.single('editor'), async (req, res) => {
    try {
        if (req.file) {
            // 클라이언트에 반환할 파일 경로
            console.log('업로드된 파일 경로:', req.file.path);
            const filePath = `/uploads/editor/${req.file.filename}`;
            
            // 클라이언트에 이미지 URL을 반환
            res.status(200).json({ imgUrl: filePath });
        } else {
            res.status(400).json({ message: '파일이 없습니다.' });
        }
    } catch (error) {
        console.error('파일 업로드 중 오류 발생:', error);
        res.status(500).json({ message: '파일 업로드 실패', error: error.message });
    }
});

module.exports = router;