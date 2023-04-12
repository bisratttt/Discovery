exports = async function(arg){
  const CLIENT_ID = "08c721f15bf04ac9b4812ab29c113afd";
  const CLIENT_SECRET = "662d08df25b24add9666674b74a38740";
  const auth_endpoint = 'https://accounts.spotify.com/api/token';
  const auth_string = `${CLIENT_ID}:${CLIENT_SECRET}`;
  
  const playlist_id = "0GTk24v6Hx76tCJJ4UhbzO";
  
  let authorization;
  if (typeof btoa !== "undefined") {
		authorization = btoa(auth_string);
	}
	else if (Buffer) {
		authorization = Buffer.from(auth_string).toString("base64");
	}
	else {
		throw new Error("Authorization parse failed.");
	}
	
	const auth_token = await fetch(auth_endpoint, {
	  method: "post",
	  form: "grant_type=client_credentials",
	  headers: {
			"Content-Type": 'application/x-www-form-urlencoded',
			Authorization: `Bearer ${authorization}`
		}
	}).then((res) => res.json())
	  .then((json) => json.access_token)
	  .catch((err) => {
	    console.error("Token fetch.", err);
	  })
};

/*
const fetch = require('node-fetch');

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const refreshToken = 'YOUR_REFRESH_TOKEN';
const playlistId = 'YOUR_PLAYLIST_ID';

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`
  });

  const data = await response.json();
  return data.access_token;
}

async function fetchPlaylist(accessToken, playlistId) {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  return data;
}

async function removeTopSong(accessToken, playlistId, trackUri) {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tracks: [{
        uri: trackUri
      }]
    })
  });

  return response.status;
}

(async () => {
  try {
    const accessToken = await getAccessToken();
    const playlist = await fetchPlaylist(accessToken, playlistId);

    if (playlist.tracks.items.length > 0) {
      const topSong = playlist.tracks.items[0].track;
      console.log(`Top song: ${topSong.name} by ${topSong.artists[0].name}`);
      
      const removeStatus = await removeTopSong(accessToken, playlistId, topSong.uri);
      
      if (removeStatus === 200) {
        console.log('Top song removed from the playlist.');
      } else {
        console.log('Error removing the top song.');
      }
    } else {
      console.log('The playlist is empty.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();

*/