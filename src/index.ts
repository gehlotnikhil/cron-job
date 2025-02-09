const express = require('express');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 8001; // Use the port provided by Render or default to 8000

// Schedule the cron job to run at 12:00 AM daily
const ServerUrl = process.env.ServerUrl || `http://localhost:8000`;

cron.schedule("* * * * *", async () => {  // This schedules the job at 12:00 AM every day
    try {
        let result = await fetch(`${ServerUrl}/api/dailynewproblem/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        let jsondata = await result.json();
        console.log(jsondata);
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
