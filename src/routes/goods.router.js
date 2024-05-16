import express from 'express';
import joi from 'joi';
import goodsModel from '../schemas/goods.schema.js';

const router = express.Router();
// validation 및 메세지 정의
const createdGoodsSchema = joi.object({
  name: joi.string().required().messages({
    'string.base': '이름은 문자열이어야 합니다.',
    'any.required': '이름을 입력해주세요.',
  }),
  description: joi.string().required().messages({
    'string.base': '상품 설명 문자열이어야 합니다.',
    'any.required': '상품 설명을 입력해주세요.',
  }),
  manager: joi.string().required().messages({
    'string.base': '담당자명은 문자열이어야 합니다.',
    'any.required': '담당자를 입력해주세요.',
  }),
  password: joi.string().min(4).max(10).required().messages({
    'string.base': '패스워드는 문자열이어야 합니다.',
    'any.required': '패스워드를 입력해주세요.',
    'string.min': '패스워드는 최소 4글자여야 합니다.',
    'string.max': '패스워드는 최대 10글자여야 합니다.',
  }),
  status: joi.boolean().messages({
    'boolean.base': '판매 현황은 boolean으로 입력해주세요',
  }),
  passwordCheck: joi.string().optional(),
});

// 상품 생성 API
router.post('/goods', async (req, res, next) => {
  try {
    const validation = await createdGoodsSchema.validateAsync(req.body);
    const {
      name,
      description,
      manager,
      password,
      createdAt,
      updatedAt,
      GoodsStatus,
    } = validation;
    const duplicationName = await goodsModel.findOne({ name });
    if (duplicationName) {
      throw new Error('이미 등록된 상품입니다.');
    }
    const goods = new goodsModel({
      name,
      description,
      manager,
      password,
      status: GoodsStatus,
      createdAt,
      updatedAt,
    });
    await goods.save();
    return res.status(201).json({
      status: res.statusCode,
      message: '새로운 상품이 등록되었습니다.',
      goods: goods,
    });
  } catch (error) {
    next(error);
  }
});

// 상품 목록 조회 API
router.get('/goods', async (req, res, next) => {
  try {
    const goods = await goodsModel.find().sort('-createdAt').exec();
    if (goods == '') {
      throw new Error('조회할 상품이 존재하지 않습니다.');
    }
    return res.status(200).json({
      status: res.statusCode,
      message: '상품 목록 조회에 성공하였습니다.',
      goods,
    });
  } catch (error) {
    next(error);
  }
});

// 상품 상세 조회 API
router.get('/goods/:goodsId', async (req, res, next) => {
  try {
    const { goodsId } = req.params;
    const goods = await goodsModel.findOne({ _id: goodsId }).exec();
    if (goods == null) {
      throw new Error('조회할 상품이 존재하지 않습니다.');
    }
    return res.status(200).json({
      status: res.statusCode,
      message: '상품 상세 목록 조회에 성공하였습니다.',
      goods,
    });
  } catch (error) {
    next(error);
  }
});

// 상품 수정 API
router.patch('/goods/:goodsId', async (req, res, next) => {
  try {
    const validation = await createdGoodsSchema.validateAsync(req.body);
    const { goodsId } = req.params;
    const { name, description, manager, status, password, passwordCheck } =
      validation;
    const currentGoods = await goodsModel
      .findOne({ _id: goodsId })
      .select('+password')
      .exec();
    if (!currentGoods) {
      throw new Error('존재하지 않는 상품입니다.');
    }
    if (currentGoods.password != passwordCheck) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    currentGoods.name = name;
    currentGoods.description = description;
    currentGoods.manager = manager;
    currentGoods.GoodsStatus = status ? 'FOR_SALE' : 'SOLD_OUT';
    currentGoods.password = password;
    currentGoods.updatedAt = new Date();

    await currentGoods.save();
    return res.status(200).json({
      status: res.statusCode,
      message: '상품 수정에 성공하였습니다.',
    });
  } catch (error) {
    next(error);
  }
});

// 상품 삭제 API
router.delete('/goods/:goodsId', async (req, res, next) => {
  try {
    const { goodsId } = req.params;
    const { passwordCheck } = req.body;
    const goods = await goodsModel
      .findOne({ _id: goodsId })
      .select('+password')
      .exec();
    if (!goods) {
      throw new Error('존재하지 않는 상품입니다.');
    }
    if (goods.password != passwordCheck) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    await goodsModel.deleteOne({ _id: goodsId });
    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
});

// 비밀번호 바리데이션 체크 joi

export default router;
