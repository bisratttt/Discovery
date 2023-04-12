exports = async function(arg){
  const https = require("https");
  
  const CLIENT_ID = "08c721f15bf04ac9b4812ab29c113afd";
  const CLIENT_SECRET = "662d08df25b24add9666674b74a38740";
  const playlist_id = "0GTk24v6Hx76tCJJ4UhbzO";
  
  https.get("/login", (req, res) => {
    let state = generateRandomString(16);
    
  });
  
  https.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, (res) => {
    let data = '';
  
    // A chunk of data has been received.
    res.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    res.on('end', () => {
      console.log(data);
    });
  });
};