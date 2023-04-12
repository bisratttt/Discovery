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