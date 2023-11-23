const path = require("path");

const HtmlwebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 개발 모드 설정
  // 빌드할때 최적화를 할건지 안할건지
  mode: "development",

  // 진입점
  entry: "./src/index.js",

  // 모듈의 규칙 설정
  module: {
    rules: [
      {
        // 읽어올 파일 확장자
        test: /\.(js|jsx)$/,
        // 읽어올 파일중에 제외할 속성
        // exclude 제외할 폴더
        exclude: /node_modules/,
        // JSX 문법을 작성하는데
        // babel-loader를 사용해서 javascript로 변환하자.
        use: ["babel-loader"],
      },
    ],
  },

  // 사용할 플러그인 설정
  plugins: [
    // HtmlwebpackPlugin을 사용해서 index.html 번들링한 폴더에 생성
    new HtmlwebpackPlugin({
      // 변환할 html의 경로
      template: "src/index.html",
      // 번들링 되고 파일의 이름
      filename: "index.html",
    }),
  ],

  // 번들링 내보낼 속성
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
};
