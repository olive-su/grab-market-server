const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const port = 8080;

app.use(express.json()); // json 전달
app.use(cors()); // 어느 브라우저에서든 접근 가능

app.get("/products", (req, res) => {
  models.Product.findAll({
    //limit: 1, // 1개만 보여지게 최대 데이터 조회 개수 지정할 수 있음
    //where: ,// 조건 지정해주는 인자
    order: [["createdAt", "DESC"]], // 정렬방식 바꿔주는 인자
    attributes: ["id", "name", "price", "createdAt", "seller", "imageUrl"], // 필요한 데이터만 뽑아올 수 있도록 컬럼 지정
  }) // 모든 내용 조회하면 오래 걸릴 수 있음
    .then((result) => {
      // 테이블 내 모든 내용 조회
      console.log("PRODUCTS : ", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("에러 발생");
    });

  //const query = req.query;
  //console.log(query);
  // res.send({
  //   products: [
  //     {
  //       id: 1,
  //       name: "농구공",
  //       price: 100000,
  //       seller: "조던",
  //       imageUrl: "images/products/basketball1.jpeg",
  //     },
  //     {
  //       id: 2,
  //       name: "축구공",
  //       price: 50000,
  //       seller: "메시",
  //       imageUrl: "images/products/soccerball1.jpg",
  //     },
  //     {
  //       id: 3,
  //       name: "키보드",
  //       price: 10000,
  //       seller: "그랩",
  //       imageUrl: "images/products/keyboard1.jpg",
  //     },
  //   ],
  // });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, description, price, seller } = body; // 해당 들어온 입력값으로 객체를 생성하고 정상 처리되면 then 처리, 오류 발생하면 catch 처리
  if (!name || !description || !price || !seller) {
    // value 에러 발생하지 않도록 방어코드 작성
    res.send("모든 필드를 입력해주세요.");
  }
  models.Product.create({
    // 객체 생성
    name,
    description,
    price,
    seller,
  })
    .then((result) => {
      console.log("상품 생성 결과 : ", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 업로드에 문제가 발생했습니다.");
    });
});

// id 값으로 하나의 상품 정보 가져오기
app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("PRODUCT : ", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 조회에 에러가 발생했습니다.");
    });
});

app.listen(port, () => {
  console.log("그랩의 쇼핑몰 서버가 돌아가고 있습니다.");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공!");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB 연결 에러");
      process.exit();
    });
});
