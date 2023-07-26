# Last.fm Scrobble Remover 1.2.4
![image](https://github.com/sjaakbanaan/lastfm-scrobble-remover/assets/2773301/551e412c-8f69-462a-9a4b-fd978a8ba2f4)

## Overview

The Last.fm Scrobble Deletion Script is a Node.js script that allows you to delete scrobbles from your Last.fm library for a list of artists. It uses the Last.fm API to perform the deletion, and you can specify the list of artists in a text file called `artists.txt`.

## Prerequisites

Before running the script, make sure you have the following:

1. Node.js installed on your system. You can download it from the official website: https://nodejs.org/

2. Last.fm account with scrobbles you want to delete.

3. The necessary environment variables to be set in the `.env` file. You can find these variables in your browser cookies after logging in to Last.fm:

   - `USERNAME`: Your Last.fm username
   - `CSRF_TOKEN`: The CSRF token from your Last.fm cookies
   - `SESSION_ID`: The session ID from your Last.fm cookies

## Usage

1. Clone this repository to your local machine.

2. Copy `.env-example` to `.env` in the root directory and update the environment variables with your Last.fm account information. The file should look like this:
```
USERNAME=your_lastfm_username
CSRF_TOKEN=your_csrf_token
SESSION_ID=your_session_id
```
3. Create a `artists.txt` file in the root directory and add the list of artists you want to delete scrobbles for. Each artist should be on a new line, like this:
```
Artist
Artist+2
Artist+3
... (add more artists as needed)
```
4. Install the required dependencies by running the following command in the terminal:
```
npm install
```
5. Run the script using the following command:
```
npm run start
```
## Script Behavior

1. The script reads the list of artists from the `artists.txt` file.

2. For each artist in the list, it sends an HTTP POST request to Last.fm API to delete scrobbles for that artist.

3. If scrobbles are found for the artist, it will delete them and display the number of scrobbles deleted.

4. If no scrobbles are found for the artist, it will log a message saying that there is nothing to delete.

5. The script will pause for a random time between 2000 and 3000 milliseconds (2 to 3 seconds) after each request to prevent any potential rate limiting or ban from Last.fm.

6. After processing all the artists, the script will display the total number of scrobbles deleted.

7. If there are any errors during the process, the script will log the error details.

## Important Note

Please use this script responsibly and only delete scrobbles that you want to remove. Deleting scrobbles is irreversible, and the script should be used with caution.

