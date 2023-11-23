const path = require("path");

module.exports = {
  // 진입점
  entry: "./src/index.js",

  // 모듈의 규칙 설정
  module: {
    rules: [
      {
        // 파일의 확장자와 일치하는 파일을 찾는 정규식
        // test
        test: /\.css$/,
        // .css파일을 읽어오고
        // 어떤 로더로 이파일을 읽을거냐?.
        // use : 파일을 읽는데 사용할 로더를 작성
        // style-loader, css-loader : html 문서 헤드에 style 태그를 생성 이후 읽어온 css 코드들을 추가해준다.
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  // 번들링된 파일 내보내기 속성
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
};
