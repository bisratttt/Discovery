exports = async function(){
  
  const CLIENT_ID = "08c721f15bf04ac9b4812ab29c113afd";
  const CLIENT_SECRET = "662d08df25b24add9666674b74a38740";
  const auth_endpoint = 'https://accounts.spotify.com/api/token';
  const auth_string = `${CLIENT_ID}:${CLIENT_SECRET}`;
  
  const playlist_id = "0GTk24v6Hx76tCJJ4UhbzO";
  const playlist_endpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
  
  let authorization = Buffer.from(auth_string).toString("base64");
	
	// gets an access token to access the playlist
	async function getAccessToken() {
	  const auth_token = await context.http.post({
	    url: auth_endpoint,
	    body: "grant_type=client_credentials",
  	  headers: {
  			"Content-Type": ["application/x-www-form-urlencoded"],
  			"Authorization": [`Basic ${authorization}`]
  		},
  	}).then((response) => {
  	  return EJSON.parse(response.body.text());
  	});
  	
  	return auth_token.access_token;
	}
	
	// fetches the tracks from our Spotify playlist
	async function getTrack(access_token, playlist_id) {
	  const tracks = await context.http.get({
	    url: playlist_endpoint,
	    headers: {
	      "Authorization": [`Bearer ${access_token}`]
	    }
	  }).then((response) => {
	    return EJSON.parse(response.body.text());
	  })
	  
	  return tracks.items[0].track;
	}
	
	async function deleteTopTrack(access_token, playlist_id, track_uri) {
	  const response = await context.http.delete({
	    url: playlist_endpoint,
	    headers: {
	      "Authorization": [`Bearer ${access_token}`],
	     // "Content-Type": ["application/json"]
	    },
	    encodeBodyAsJSON: true,
	    body: {
	      tracks: [{
	        uri: track_uri
	      }]
	    }
	  });
	  
	  return response.status;
	}
	
	let track;
	try {
	  const access_token = await getAccessToken();
	 // console.log(access_token);
	  track = await getTrack(access_token, playlist_id);
	 // console.log(track.uri);
	 // await deleteTopTrack(access_token, playlist_id, track.uri);
	 console.log(track.name);
	}
	catch(err) {
	  console.error("Token Retrieve", err);
	}
	
	return track
};



























/*
const axios = require('axios');

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const refreshToken = 'YOUR_REFRESH_TOKEN';
const playlistId = 'YOUR_PLAYLIST_ID';

async function getAccessToken() {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
  });

  return response.data.access_token;
}

async function fetchPlaylist(accessToken, playlistId) {
  const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });

  return response.data;
}

async function removeTopSong(accessToken, playlistId, trackUri) {
  const response = await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    data: {
      tracks: [{
        uri: trackUri
      }]
    }
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