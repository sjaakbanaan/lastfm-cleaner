const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');

// Load the environment variables from the .env file
dotenv.config();

async function makeRequests() {
  try {
    const userName = process.env.USERNAME;
    const csrfToken = process.env.CSRF_TOKEN;
    const sessionID = process.env.SESSION_ID;

    const artistList = fs.readFileSync('artists.txt', 'utf8').trim().split('\n');

    for (const artist of artistList) {
      
      // Make an HTTP POST request to the current URL with the provided headers
      const response = await axios.post(
          `https://www.last.fm/user/${userName}/library/music/${artist}/+delete?is_modal=1`,
          `csrfmiddlewaretoken=${csrfToken}&confirm=on&ajax=0`
        , {
        headers: {
          'cookie': `csrftoken=${csrfToken};sessionid=${sessionID}`,
          'origin': 'https://www.last.fm',
          'referer': 'https://www.last.fm',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      });

      // Handle the response here (you can log it or process the data), errors in: response.data
      console.log(`Scrobbles from ${artist.replace(/\+/g, ' ')} deleted succesfully!`);

      // Pause for 5 seconds before making the next request
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    console.log('All requests completed successfully.');
  } catch (error) {
    // Handle errors if any
    console.error('Error occurred:', error.response.status, error.response.data);
  }
}

// Call the function to start making requests
makeRequests();