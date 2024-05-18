import express from "express";
import goodsModel from "../schemas/goods.schema.js";
import { createdGoodsValidator } from "../middlewares/validators/createGoods.validator.middleware.js";
import { updateGoodsValidator } from "../middlewares/validators/updateGoods.validator.middleware.js";
import { deleteGoodsValidator } from "../middlewares/validators/deleteGoods.validator.middleware.js";

const router = express.Router();
// validation 및 메세지 정의

// 상품 생성 API
router.post("/goods", createdGoodsValidator, async (req, res, next) => {
  try {
    const { name, description, manager, password } = req.body;
    const duplicationName = await goodsModel.findOne({ name });
    if (duplicationName) {
      return res
        .status(400)
        .json({ status: res.statusCode, message: "이미 등록된 상품입니다." });
    }
    const goodsData = new goodsModel({
      name,
      description,
      manager,
      password,
    });
    let goods = await goodsData.save();
    goods = { ...goods.toJSON(), password: undefined };
    return res.status(201).json({
      status: res.statusCode,
      message: "새로운 상품이 등록되었습니다.",
      goods,
    });
  } catch (error) {
    next(error);
  }
});

// 상품 목록 조회 API
router.get("/goods", async (req, res, next) => {
  try {
    const goods = await goodsModel.find().sort("-createdAt").exec();
    return res.status(200).json({
      status: res.statusCode,
      message: "상품 목록 조회에 성공하였습니다.",
      goods,
    });
  } catch (error) {
    next(error);
  }
});

// 상품 상세 조회 API
router.get("/goods/:goodsId", async (req, res, next) => {
  try {
    const { goodsId } = req.params;
    const goods = await goodsModel.findOne({ _id: goodsId }).exec();
    if (!goods) {
      return res.status(404).json({
        status: res.statusCode,
        message: "해당 상품이 존재하지 않습니다.",
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      message: "상품 상세 목록 조회에 성공하였습니다.",
      goods,
    });
  } catch (error) {
    next(error);
  }
});

// 상품 수정 API
router.patch(
  "/goods/:goodsId",
  updateGoodsValidator,
  async (req, res, next) => {
    try {
      const { goodsId } = req.params;
      const { name, status, description, password, manager } = req.body;
      const currentGoods = await goodsModel
        .findOne({ _id: goodsId })
        .select("+password")
        .exec();
      if (!currentGoods) {
        return res.status(404).json({
          status: res.statusCode,
          message: "해당 상품이 존재하지 않습니다.",
        });
      }
      const passwordCheck = password === currentGoods.password;
      if (!passwordCheck) {
        return res.status(401).json({
          status: res.statusCode,
          message: "패스워드가 일치하지 않습니다.",
        });
      }
      const goodsData = {
        ...(name && { name }),
        ...(description && { description }),
        ...(status && { status }),
        ...(manager && { manager }),
      };
      const goods = await goodsModel.findByIdAndUpdate(goodsId, goodsData, {
        new: true,
      });
      return res.status(200).json({
        status: res.statusCode,
        message: "상품 수정에 성공하였습니다.",
        goods,
      });
    } catch (error) {
      next(error);
    }
  }
);

// 상품 삭제 API
router.delete(
  "/goods/:goodsId",
  deleteGoodsValidator,
  async (req, res, next) => {
    try {
      const { goodsId } = req.params;
      const { password } = req.body;
      const goods = await goodsModel
        .findOne({ _id: goodsId })
        .select("+password")
        .exec();
      if (!goods) {
        return res.status(404).json({
          status: res.statusCode,
          message: "해당 상품이 존재하지 않습니다.",
        });
      }
      const passwordCheck = password === goods.password;
      if (!passwordCheck) {
        return res.status(401).json({
          status: res.statusCode,
          message: "패스워드가 일치하지 않습니다.",
        });
      }
      await goodsModel.deleteOne({ _id: goodsId });
      return res.status(200).json({
        status: res.statusCode,
        message: "상품 삭제에 성공하였습니다.",
      });
    } catch (error) {
      next(error);
    }
  }
);

// 비밀번호 바리데이션 체크 joi

export default router;
