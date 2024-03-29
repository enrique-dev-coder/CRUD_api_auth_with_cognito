"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const task_1 = __importDefault(require("./routes/task"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
// allow cors
app.use((0, cors_1.default)());
// prase json incoming req
app.use(express_1.default.json());
// extra security
app.use((0, helmet_1.default)());
//routes
app.use('/api', task_1.default);
app.use('/auth', auth_1.default);
app.get("/", (req, res) => {
    res.json("hola desde el server");
});
exports.default = app;
