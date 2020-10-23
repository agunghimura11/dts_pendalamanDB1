"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var connect_1 = __importDefault(require("./connect"));
var app = express_1.default();
connect_1.default();
app.listen(process.env.PORT || 8000, function () {
    console.log("App listen on port " + (process.env.PORT || 8000));
});
