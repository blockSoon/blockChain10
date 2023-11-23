// node환경에서 실행이 된다 ㅎㅎ
// 파일을 뽑아주는 내용에서 설정값을 여기에 작성할수있다.
const path = require("path");
module.exports = {
  // 진입점 시작점
  entry: "./src/index.js",

  // 번들된 파일을 내보낼 속성 설정
  output: {
    filename: "bundle.js",
    // 생성할 파일의 경로
    path: path.join(__dirname, "dist"),
  },
};
