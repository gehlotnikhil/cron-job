const express = require('express');
const cron = require('node-cron');
const axios = require('axios'); // Import Axios

const app = express();
const PORT = process.env.PORT || 8001; // Use the port provided by Render or default to 8000

// Schedule the cron job to run at 12:00 AM daily
const ServerUrl = process.env.ServerUrl || `http://localhost:8000`;

cron.schedule("* * * * *", async () => {  // This schedules the job to run every minute for testing
    try {
        // Make the DELETE request to the server using Axios
        let result = await axios.delete(`${ServerUrl}/api/dailynewproblem/delete`, {
            headers: { "Content-Type": "application/json" },
        });

        // Check if the response contains data
        if (result.data) {
            console.log('Response:', result.data);  // Log the response data
        } else {
            console.log('Empty response from server');
        }
    } catch (error:any) {
        // Handle errors
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Error response:', error.response.data);
        } else if (error.request) {
            // Request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something else happened in setting up the request
            console.error('Error in request setup:', error.message);
        }
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
