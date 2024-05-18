# stephenShop

- 상품 CRUD 구현하는 프로젝트
- HTTP 메서드를 사용하여 API를 작성
- 구현된 동작마다 상태코드와 메세지를 반환
- Joi와 에러처리 미들웨어 구현
- AWS ec2를 통한 가상서버 구축, 배포
- 가비아에서 제공하는 도메인과 연결
- PM2를 사용하여 터미널이 꺼지더라도 서버를 작동시키도록 한다.

# 실행

- src 폴더 내에 app.js 파일 구동
- 3000번 포트로 접속하여 api 실행
- 혹은 stephenoeul.shop 도메인을 통하여 접속한다.

# 개선

_24.05.18, 원본은 main, 수정본은 update 브랜치에 업로드_  
_하단 내용은 개선하며 추가된 내용입니다._

- 환경변수 추가 (.env, goodsconstant)
- 에러마다 같은 상태코드를 반환하던 문제 수정
- validators 폴더 추가하여 validator 구조화
- README 작성
- 개선 과정을 github issue로 등록하여 태스크를 나눠 작업했다.
- package.json 내 scripts 구절 추가

# 실행 #2

1. `.env` 파일을 생성하여 환경변수 추가.
2. `yarn` 명령으로 필요한 패키지 설장.
3. `yarn dev` 명령으로 서버 실행.
