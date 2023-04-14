exports = async function(arg){
  
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
	  track = await getTrack(access_token, playlist_id);
	 // console.log(track.uri);
	 // await deleteTopTrack(access_token, playlist_id, track.uri);
	}
	catch(err) {
	  return {newSong: false, error: err.message};
	}
	
	// Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  const dbName = "discovery";
  const songCollName = "song";
  const commentCollName = "comment";
  const db = context.services.get(serviceName).db(dbName);
  const songCollection = db.collection(songCollName);
  const commentCollection = db.collection(commentCollName);
  
  // try {
  //   // make previous day song invisible
  //   await songCollection.updateMany({"is_visible": false}, {"is_visible": true});
  //   // deletes all the comments in the db (for a specific song)
  //   await commentCollection.deleteMany({});
  // }
  // catch(err) {
  //   return {newSong: false, error: err.message};
  // }
  
  // insert the top song into the song collection
  let newSong;
  try {
    let artists = "";
    for (let i = 0; i < track.artists.length; i++) {
      artists += track.artists[i].name;
      if (i < track.artists.length - 1) {
        artists += ", ";
      }
    }
    
    const name = track.name;
    const videoId = user.functions.searchYoutubeSong(name + " " + artists);
    
    newSong = await songCollection.insertOne({
      album_name: track.album.name,
      artist: artists,
      is_visible: false,
      song_name: name,
      spotify_link: track.external_urls.spotify,
      youtube_id: videoId
    });
  }
  catch(err) {
    return {newSong: false, error: err.message};
  }
  
  return {newSong: true};
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