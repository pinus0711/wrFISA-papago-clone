const express = require('express')
const app = express()

// get-> HTTP GET method, 
// '/' -> Root 경로로 요청
// function~ -> 콜백

// http://localhost:3000'/' 경로로 요청 시 동작할 핸들러(handler)
// req -> request - HTTP Request 객체
// res -> response - HTTP Response 객체(응답 시 사용할 데이터, 부가 정보를 담을 때 사용)
app.get('/', function (req, res) {
  res.send('Hello World')
})

var client_id = 'mLsrrgBM6JHM2QG6n0RE';
var client_secret = 'aKrogkLX6W';

// localhost:3000/detectLangs로 요청 시 동작할 핸들러
app.get('/detectLangs', function (req, res) {
   const query = "언어를 감지할 문장을 입력하세요.";
   const url = 'https://openapi.naver.com/v1/papago/detectLangs';
   const request = require('request');
   const options = {
       url,
       form: {'query': query},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.post(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });

// localhost:3000/translate로 요청 시 동작할 핸들러
app.get('/translate', (req, res) => {
   const query = '안녕하세요?';
   const url = 'https://openapi.naver.com/v1/papago/n2mt';
   
   const request = require('request');
   const options = {
       url, // url: url과 같음
       form: {'source':'ko', 'target':'en', 'text':query},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    // 실제로 POST 요청 전송 부분
   request.post(options, (error, response, body) => {

     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });

// 서버 인스턴스를 3000번 포트에서 대기하도록 명시
const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:${port}/ app listening on port ${3000}`));