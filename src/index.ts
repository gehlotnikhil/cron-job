const axios = require('axios');

const ServerUrl = "https://codegalaxy-server.onrender.com";

async function runCronJob() {
  try {
    const response = await axios.delete(`${ServerUrl}/api/dailynewproblem/delete`, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Cron Job Response:', response.data);
  } catch (error: any) {
    console.error('Error in cron job:', error.message);
  }
}

runCronJob();
