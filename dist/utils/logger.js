"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston = __importStar(require("winston"));
let todayDate = new Date();
let currentDateString = `${todayDate.getFullYear()}_${(todayDate.getMonth() + 1).toString().padStart(2, '0')}_${todayDate.getDate().toString().padStart(2, '0')}`;
const logger = winston.createLogger({
    transports: new winston.transports.File({
        filename: `logs/log_${currentDateString}.log`,
        format: winston.format.combine(winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), winston.format.align(), winston.format.printf(info => `[${info.level.toUpperCase()}]   ${[info.timestamp]} ${info.message}`))
    }),
});
exports.default = logger;
//# sourceMappingURL=logger.js.map