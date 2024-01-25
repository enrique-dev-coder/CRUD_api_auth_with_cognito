"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
aws_sdk_1.default.config.update({
    region: 'us-east-1', // Reemplaza con la región de tu elección
    accessKeyId: process.env.ACCESS,
    secretAccessKey: process.env.ACCESS_SECRET,
});
exports.default = aws_sdk_1.default;
