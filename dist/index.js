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
const express = require('express');
const cron = require('node-cron');
const app = express();
const PORT = process.env.PORT || 8001; // Use the port provided by Render or default to 8000
// Schedule the cron job to run at 12:00 AM daily
const ServerUrl = process.env.ServerUrl || `http://localhost:8000`;
cron.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make the DELETE request to the server
        let result = yield fetch(`${ServerUrl}/api/dailynewproblem/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        // Get raw response text to check the contents
        let responseText = yield result.text();
        console.log('Response:', responseText); // Log the raw response body
        // Check if the response is not empty
        if (responseText) {
            try {
                // Parse the response as JSON
                let jsondata = JSON.parse(responseText);
                console.log(jsondata); // Log the parsed JSON data
            }
            catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
        else {
            console.log('Empty response from server');
        }
    }
    catch (error) {
        console.error('Error in cron job:', error);
    }
}));
// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
