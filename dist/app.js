"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// import swaggerJSDoc from 'swagger-jsdoc';
// import * as swaggerUI from 'swagger-ui-express'
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const utils_1 = require("./utils");
const router = (0, express_1.default)();
const app = (0, express_1.default)();
//#region Swagger Configuration
// const options: swaggerJSDoc.OAS3Options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "DEMO-API",
//             version: "1.0.0",
//             description: "A REST API"
//         },
//         servers: [
//             {
//                 url: "http://localhost:4000/"
//             },
//         ]
//     },
//     apis: ["src/routes/*.routes.ts"]
// };
// const specs = swaggerJSDoc(options);
// app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
//#endregion Swagger Configuration
// app.use(expressFileUpload());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.json({ type: 'application/vnd.api+json' }));
app.use((0, cors_1.default)());
/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PUT PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});
//#region API Routes
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendFile(path_1.default.join(__dirname, '/views/index.html'));
}));
app.use('/api/agent', routes_1.default.agent);
app.use('/api/answer', routes_1.default.answer);
app.use('/api/feedback', routes_1.default.feedback);
app.use('/api/product', routes_1.default.product);
app.use('/api/mqquestion', routes_1.default.mq_question);
app.use('/api/question', routes_1.default.question);
app.use('/api/survey', routes_1.default.survey);
app.use('/api/tablet', routes_1.default.tablet);
app.use('/api/user', routes_1.default.user);
//#endregion API Routes
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4400;
app.listen(port, () => console.log(`${utils_1.Utils.CONSTANT.COMMON.API_RUNNING_SUCCESSFULLY} on ${port}`));
//# sourceMappingURL=app.js.map