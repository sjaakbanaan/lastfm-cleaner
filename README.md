# Last.fm Scrobble Remover

A Node.js script that allows you to remove scrobbles from Last.fm by looping over a list of artists.

## Prerequisites
Before using this script, make sure you have the following installed on your machine:

Node.js: Download and Install Node.js
Installation
Clone the repository to your local machine:
```
git clone https://github.com/sjaakbanaan/lastfm-scrobble-remover.git
```
Change to the project's directory:
```
cd lastfm-scrobble-remover
```
Install the required dependencies:
```
npm install
```
## Configuration
Copy the .env-example file to .env in the root directory of the project.

Open your web browser and log in to your Last.fm account.
While on Last.fm, use your browser's developer tools (usually accessed by pressing F12 or right-clicking and selecting "Inspect") to find the necessary cookies.

Locate the csrftoken and sessionid cookies from Last.fm and copy their values.

In the .env file, change the following lines and paste the values you copied from the cookies and your Last.fm username:
```
USERNAME=yourusername
CSRF_TOKEN=YOUR_CSRF_TOKEN_VALUE
SESSION_ID=YOUR_SESSION_ID_VALUE
```
### Usage
Update the ArtistList variable in the index.js file with the list of artists for which you want to remove scrobbles. Replace the existing array with your list of artists.
Don't forget the '+'-symbol instead of a space.
```
const ArtistList = [
  'Artist+1',
  'Artist+2',
  'Artist+3',
  // Add more artists as needed
];
```
Run the script:
```
npm start
```
The script will loop over the list of artists and remove their scrobbles from Last.fm.

### Notes
This script uses the Axios library to make HTTP requests. Ensure that you have a stable internet connection while running the script.

Be cautious when using this script, as it permanently removes scrobbles from your Last.fm account.

Respect Last.fm's terms of service and usage policies. Only use this script for your own scrobbles and avoid excessive or automated requests to their servers.
