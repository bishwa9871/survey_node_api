
// import swaggerJSDoc from 'swagger-jsdoc';
// import * as swaggerUI from 'swagger-ui-express'
import express, { Express, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';

import routes from './routes';
import { Utils } from "./utils";

const router: Express = express();
const app = express();

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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));


app.use(cors());

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
app.get('/', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.use('/api/agent', routes.agent);
app.use('/api/answer', routes.answer);
app.use('/api/feedback', routes.feedback);
app.use('/api/product', routes.product);
app.use('/api/mqquestion', routes.mq_question);
app.use('/api/question', routes.question);
app.use('/api/survey', routes.survey);
app.use('/api/tablet', routes.tablet);
app.use('/api/user', routes.user);
//#endregion API Routes

const port: any = process.env.PORT ?? 4400;
app.listen(port, () =>
    console.log(`${Utils.CONSTANT.COMMON.API_RUNNING_SUCCESSFULLY} on ${port}`)
);