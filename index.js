const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');
const cheerio = require('cheerio');

// Load the environment variables from the .env file
dotenv.config();

// ANSI escape code for text coloring
const greenText = '\x1b[32m';
const redText = '\x1b[31m';
const resetText = '\x1b[0m';

// Function to display a horizontal line
function displayHorizontalLine() {
  console.log('----------------------------------------');
}

async function makeRequests() {
  try {
    const artistList = fs.readFileSync('artists.txt', 'utf8').trim().split('\n');
    const userName = process.env.USERNAME;
    const csrfToken = process.env.CSRF_TOKEN;
    const sessionID = process.env.SESSION_ID;
    // Variable to keep track of the total scrobbles deleted
    let totalScrobblesDeleted = 0;

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

      // Extract the content inside the paragraph with class 'big-modal-progress'
      const $ = cheerio.load(response.data);
      const progressText = $('p.big-modal-progress').text().trim();

      // Extract the number from the progressText string
      const match = progressText.match(/(\d+)/);
      const scrobblesDeleted = match ? parseInt(match[1]) : 0;
      // Clean up artist name to display
      const artistCleaned = artist.replace(/\+/g, ' ');
      displayHorizontalLine();

      // Handle the response, errors can be found in response.data
      if (scrobblesDeleted > 0) {
        console.log(`${scrobblesDeleted} scrobble${scrobblesDeleted > 0 ? 's' : ''} from ${artistCleaned} deleted ${greenText}succesfully!${resetText}`);
      } else {
        console.log(`Deletion ${redText}failed${resetText} for ${artistCleaned}, nothing to delete.`);
      }
      displayHorizontalLine();
      // Update the total scrobbles deleted
      totalScrobblesDeleted += scrobblesDeleted;

      // Generate a random timeout value between 2000 and 3000 milliseconds
      const randomTimeout = Math.floor(Math.random() * (3000 - 2000 + 1) + 2000);
      // Pause a little before making the next request
      await new Promise((resolve) => setTimeout(resolve, randomTimeout));
    }
    // Display the total scrobbles deleted
    console.log(`Total scrobbles deleted: ${totalScrobblesDeleted}`);
  } catch (error) {
    // Handle errors if any
    console.error('Error occurred:', error.response.status, error.response.data);
  }
}

// Call the function to start making requests
makeRequests();