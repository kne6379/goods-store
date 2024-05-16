export default (err, req, res, next) => {
  console.log('에러처리 미들웨어가 실행되었습니다.');
  console.log(err.name);
  console.error(err);
  if (err) {
    return res.status(400).json({ errorMessage: err.message });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ errorMessage: err.message });
  }
  return res //조이 에러가 아닌 에상치 못한 에러
    .status(500)
    .json({
      errorMessage: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요',
    });
};
