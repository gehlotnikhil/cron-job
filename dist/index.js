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
const axios = require('axios');
const ServerUrl = "https://codegalaxy-server.onrender.com";
function runCronJob() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.delete(`${ServerUrl}/api/dailynewproblem/delete`, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Cron Job Response:', response.data);
        }
        catch (error) {
            console.error('Error in cron job:', error.message);
        }
    });
}
runCronJob();
