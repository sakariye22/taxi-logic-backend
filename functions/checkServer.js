const axios = require('axios');
const { exec } = require('child_process');

// Start the server using the npm script inside the functions directory
const server = exec('npm run start2', { cwd: './' });

server.stdout.on('data', (data) => {
  console.log(data);
});

server.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Give the server some time to start
setTimeout(() => {
  // Check if the server is up by pinging the health endpoint
  axios.get('http://localhost:3000/health') // Replace PORT with your server's actual port number
    .then(response => {
      if(response.status === 200) {
        console.log('Success: Server is up and running');
      } else {
        console.error('Error: Health check failed');
      }
      process.exit(0); // exit successfully
    })
    .catch(error => {
      console.error('Error: Unable to reach the server:', error.message);
      process.exit(1); // exit with error
    });
}, 5000); // Adjust the timeout as needed based on how long your server takes to start
