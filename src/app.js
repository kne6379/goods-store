import express from "express";
import connect from "./schemas/index.js";
import goodsRouter from "./routes/goods.router.js";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";
import { SERVER_PORT } from "./constants/env.constant.js";

const app = express();
const PORT = SERVER_PORT;

connect();
// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 로그 작성 미들웨어
app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl, "-", new Date());
  next();
});

//라우터 설정
app.use("/api", goodsRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
