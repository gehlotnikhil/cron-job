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
const axios = require('axios'); // Import Axios
const app = express();
const PORT = process.env.PORT || 8001; // Use the port provided by Render or default to 8000
// Schedule the cron job to run at 12:00 AM daily
const ServerUrl = process.env.ServerUrl || `http://localhost:8000`;
cron.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make the DELETE request to the server using Axios
        let result = yield axios.delete(`${ServerUrl}/api/dailynewproblem/delete`, {
            headers: { "Content-Type": "application/json" },
        });
        // Check if the response contains data
        if (result.data) {
            console.log('Response:', result.data); // Log the response data
        }
        else {
            console.log('Empty response from server');
        }
    }
    catch (error) {
        // Handle errors
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Error response:', error.response.data);
        }
        else if (error.request) {
            // Request was made but no response was received
            console.error('No response received:', error.request);
        }
        else {
            // Something else happened in setting up the request
            console.error('Error in request setup:', error.message);
        }
    }
}));
// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
