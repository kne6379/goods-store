import 'dotenv/config';
import express from 'express';
import connect from './schemas/index.js';
import goodsRouter from './routes/goods.router.js';
import errorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3000;

connect();
// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 로그 작성 미들웨어
app.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl, '-', new Date());
  next();
});
// 익스프레스 라우터 선언
const router = express.Router();

// api 테스트
router.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

//라우터 설정
app.use('/api', [router, goodsRouter]);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
