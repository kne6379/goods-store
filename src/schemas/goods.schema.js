import mongoose from 'mongoose';

const goodsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  manager: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  GoodsStatus: {
    type: String,
    default: 'FOR_SALE',
  },
  //상품명, 상품 설명, 담당자, 비밀번호 > req.body로 입력받음
  //상품 id, 생성 일시, 수정 일시 > 자동생성
  // 판매 상태는 기본 판매 중.
});

export default mongoose.model('goodsModel', goodsSchema);
