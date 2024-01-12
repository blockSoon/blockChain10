import UserService from "./service/user.service";
import Strategy from "./strategy/strategy";
import { EmailAuthenticator } from "./strategy/email.strategy";
import { UserController } from "./user.controller";
import { KakaoAuthernticator } from "./strategy/kakao.stategy";

// 전략패턴 객체 생성
const strategy = new Strategy();
// strategy = { strategy = {}, set(), login }

// 기능을 추가
strategy.set("email", new EmailAuthenticator());
// 기능하나더 추가
strategy.set("kakao", new KakaoAuthernticator());

// strategy = { strategy = {"email" : {EmailAuthenticator} }, set(), login }
// strategy["email"]

// UserService 객체 정의 생성자 함수에 매개변수로 strategy객체 전달
const userService = new UserService(strategy);

// userService = { strategy : { strategy = {"email" : {EmailAuthenticator} }, set(), login } , login()}

// 완성된 유저의 로그인 로직 서비스의 객체를 최종적으로 유저 컨트롤러 객체에 전달.
const userController = new UserController(userService);

// userController = {userService = { strategy : { strategy = {"email" : {EmailAuthenticator} }, set(), login } , login()}, signin()}

userController.signin("kakao");
