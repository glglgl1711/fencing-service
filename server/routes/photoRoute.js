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

// 사진첩 리스트

// 사진첩 등록

// 사진첩 수정

// 사진첩 삭제

module.exports = router;