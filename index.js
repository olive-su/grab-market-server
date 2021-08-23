let http = require("http");
let hostname = "127.0.0.1"; // 내 컴퓨터 포트 번호
let port = 8080;

const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;
  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" }); // json 타입으로 응답을 넘기겠다는 뜻
      const products = JSON.stringify([
        // str 형태로 바꿔서 넣음
        {
          name: "농구공",
          price: 5000,
        },
      ]);
      res.end(products);
    } else if (method === "POST") {
      res.end("생성되었습니다!");
    }
    res.end("Good Bye"); // end 명령어 -> 서버에서 응답 결과를 반환함
  }
});

server.listen(port, hostname); // 해당 포트번호와 호스트 네임으로 호출을 기다리고 있음을 뜻함

console.log("grab market server on!");
