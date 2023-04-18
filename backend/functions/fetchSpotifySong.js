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
const auth_endpoint = 'https://accounts.spotify.com/api/token';
const auth_url = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = 'your_client_id';
const CLIENT_SECRET = 'your_client_secret';
const REDIRECT_URI = 'your_redirect_uri';

const playlist_id = "your_private_playlist_id";
const playlist_endpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

let authorization = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

function generateAuthURL() {
  const scope = 'playlist-read-private';
  const state = 'your_state';
  const authURL = `${auth_url}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&state=${state}`;
  return authURL;
}

async function getAccessTokenWithCode(authorizationCode) {
  const response = await context.http.post({
    url: auth_endpoint,
    body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
    headers: {
      "Content-Type": ["application/x-www-form-urlencoded"],
      "Authorization": [`Basic ${authorization}`]
    },
  });

  const tokenData = EJSON.parse(response.body.text());
  return tokenData.access_token;
}

async function getAccessTokenWithRefreshToken(refresh_token) {
  const response = await context.http.post({
    url: auth_endpoint,
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    headers: {
      "Content-Type": ["application/x-www-form-urlencoded"],
      "Authorization": [`Basic ${authorization}`]
    },
  });

  const tokenData = EJSON.parse(response.body.text());
  return tokenData.access_token;
}


call like the following

async function main() {
  // Replace this with your stored refresh token
  const stored_refresh_token = 'your_stored_refresh_token';

  try {
    const access_token = await getAccessTokenWithRefreshToken(stored_refresh_token);
    track = await getTrack(access_token, playlist_id);
    console.log(track.name);
  } catch (err) {
    console.error("Token Retrieve", err);
  }

  return track;
}

To use auth 2.0 automatically
Here's how you can do it:

Obtain an access token and a refresh token using the Authorization Code Flow, either through a one-time manual process or by using a simple web app to perform the initial authorization.

Store the refresh token securely.

Use the refresh token to request a new access token when the current one expires.


*/