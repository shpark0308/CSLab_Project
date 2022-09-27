// express 모듈 호출
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 사용

var connection = mysql.createConnection({
    host : "203.153.148.133",
    user : "shpark0308",
    password : "2057213sh",
    database : "blockchain",
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
 
// http://localhost:4000/ 으로 접속 시 응답메시지 출력
app.get('/', (req,res) => {
    res.send('Server Response Success');
})

// [1]. Data Insert
app.post("/insert", (req,res)=>{
    const serverid = req.body.index_id;
    console.log(req.body);

    // DataTime Format
    const dateTime = '2017-02-04 11:23:54';

    let dateTimeParts= dateTime.split(/[- :]/);
    dateTimeParts[1]--;
    const dateObject = new Date(...dateTimeParts); // our Date object

    connection.query("INSERT INTO grafana (date, blockPermin, blockNum) values (?,?,?)",[dateObject,serverid,serverid],
    function(err,rows,fields){
        if(err){
            //console.log("실패");
            console.log(err);
        }else{
            //console.log("성공");
            console.log(rows);
        };
    });

    // Post Message
    /*console.log(serverid);
    
    const sendText = {
        text : "CSLab022",
    };
    res.send(sendText);*/

});

// [2]. Data List
app.post('/list', (req,res) => {
    connection.query("SELECT * FROM grafana",
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
            //console.log(err);
        }else{
            console.log("불러오기 성공");
            res.send(rows);
            //console.log(rows);
        };
    })
})

app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})