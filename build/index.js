"use strict";
// usar variables de entorno del .env
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const http_1 = __importDefault(require("http"));
const app_js_1 = __importDefault(require("./app.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT;
const server = http_1.default.createServer(app_js_1.default);
function startServer() {
    server.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}
mongoose_1.default.connect(process.env.MONGO_URI || '')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
startServer();
