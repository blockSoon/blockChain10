// jest의 테스트코드를 실행할때 속성값

// jest를 사용할때 필요한 정의된 타입을 가져옴
import type { Config } from "@jest/types";

const config : Config.InitialOptions = {
    // 1 모듈의 파일 확장자 설정.
    moduleFileExtensions : ["ts", "js"],
    // 2 파일의 경로 패턴 설정
    testMatch : ["<rootDir>/**/*.test.(js|ts)"],
    // temp.test.ts, temp.test.js

    // 3 모듈의 이름에 대한 별칭 설정 @core
    // 별칭으로 지정된 @core 경로를 어떤식으로 진짜 경로로 바꿔줄거냐
    // ^@core == @core/**/*/ 로 시작하는 별칭은 루트경로에 src/core
    // 경로 패턴 설정
    moduleNameMapper : {
        "^@core/(.*)$" : "<rootDir>/src/core/$1"
    },

    // 4 테스트 환경 설정 node 환경에서 실행 시킬것.
    testEnvironment : "node",
    // 5. 자세한 로그를 출력 설정
    verbose : true,

    // 6 프리셋 설정 typescript로 jest 사용
    preset : "ts-jest"
}

export default config;