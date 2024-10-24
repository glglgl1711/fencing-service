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
        cb(null, uploadDir); // 위에서 확인한 경로로 저장
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // 유니크한 파일명 생성
    }
});

const upload = multer({storage : storage});

// router.post('/set-image', upload.fields([{name : 'file' , maxCount : 50} , {name : 'editor'}]) , async(req , res) => {
//     const editor = req.files.editor ? req.files.editor[0] : null;

//     try {
//        let editor = null;
//        if(editor){
//         editor = `/image/editor/${editor.filename}`;
//        }


//     }
// })

module.exports = router;