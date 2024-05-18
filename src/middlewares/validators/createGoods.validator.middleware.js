import Joi from 'joi';

export const createdGoodsValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      name: Joi.string().required().messages({
        'string.base': '이름은 문자열이어야 합니다.',
        'any.required': '이름을 입력해주세요.',
      }),
      description: Joi.string().required().messages({
        'string.base': '상품 설명 문자열이어야 합니다.',
        'any.required': '상품 설명을 입력해주세요.',
      }),
      manager: Joi.string().required().messages({
        'string.base': '담당자명은 문자열이어야 합니다.',
        'any.required': '담당자를 입력해주세요.',
      }),
      password: Joi.string().min(4).max(10).required().messages({
        'string.base': '패스워드는 문자열이어야 합니다.',
        'any.required': '패스워드를 입력해주세요.',
        'string.min': '패스워드는 최소 4글자여야 합니다.',
        'string.max': '패스워드는 최대 10글자여야 합니다.',
      }),
    });
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
