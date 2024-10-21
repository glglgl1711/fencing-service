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

// 봉사 등록
router.post('/regist' , async (req, res) => {
    const {title , contents , applyDate , serviceDate , registar , agency , location , appliPeople , recruitmentPeople,
        serviceTime , managerName , managerPhone , managerEmail
    } = req.body;
    const sql = `
        INSERT INTO f_service (s_title , s_contents, s_apply_date , s_service_date , s_registrar , s_agency , s_location , s_service_time, s_appli_people , s_recruitment_people , s_manager_name , s_manager_phone , s_manager_email , s_status , s_date)
        VALUES ( ?, ? , ? , ? , ? , ? , ? , ? , ? , ? ,? ,? , ? , 'Y' , NOW())
    `;
    connection.query(sql , [title , contents , applyDate , serviceDate , registar , agency , location , serviceTime, appliPeople , recruitmentPeople, managerName , managerPhone , managerEmail], async(err, result) => {
        if(err) {
            return res.status(200).json({result : false , msg : '서버 오류가 발생했습니다. 관리자 요망'});
        }
        return res.status(200).json({result : true})
    })
})
// 봉사 리스트

// 봉사 신청하기 & 신청 해제하기

// 봉사 리스트

// 봉사 모집 & 마감 변경

// 봉사 수정

// 봉사 삭제

module.exports = router;