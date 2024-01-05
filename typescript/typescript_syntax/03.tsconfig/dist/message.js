"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_server_1 = __importDefault(require("./user/server/user.server"));
const message2 = "hello typescript";
console.log(message2);
console.log(user_server_1.default);
