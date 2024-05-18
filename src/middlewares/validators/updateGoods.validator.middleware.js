import Joi from "joi";
import { GOODS_STATUS } from "../../constants/goods.constant.js";

export const updateGoodsValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      name: Joi.string().messages({
        "string.base": "이름은 문자열이어야 합니다.",
      }),
      description: Joi.string().messages({
        "string.base": "상품 설명은 문자열이어야 합니다.",
      }),
      status: Joi.string()
        .valid(...Object.values(GOODS_STATUS))
        .messages({
          "string.base": "상품 상태는 문자열이어야 합니다.",
          "any.only": "상품 상태는 [FOR_SALE,SOLD_OUT] 중 하나여야 합니다.",
        }),
      manager: Joi.string().messages({
        "string.base": "담당자명은 문자열이어야 합니다.",
      }),
      password: Joi.string().required().messages({
        "string.base": "패스워드는 문자열이어야 합니다.",
        "any.required": "비밀번호를 입력해주세요.",
      }),
    });
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
