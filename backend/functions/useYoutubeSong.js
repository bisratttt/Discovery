exports = async function(arg){
  // // This default function will get a value and find a document in MongoDB
  // // To see plenty more examples of what you can do with functions see: 
  // // https://www.mongodb.com/docs/atlas/app-services/functions/

  // // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  // var serviceName = "mongodb-atlas";

  // // Update these to reflect your db/collection
  // var dbName = "db_name";
  // var collName = "coll_name";

  // // Get a collection from the context
  // var collection = context.services.get(serviceName).db(dbName).collection(collName);

  // var findResult;
  // try {
  //   // Get a value from the context (see "Values" tab)
  //   // Update this to reflect your value's name.
  //   var valueName = "value_name";
  //   var value = context.values.get(valueName);

  //   // Execute a FindOne in MongoDB 
  //   findResult = await collection.findOne(
  //     { owner_id: context.user.id, "fieldName": value, "argField": arg},
  //   );

  // } catch(err) {
  //   console.log("Error occurred while executing findOne:", err.message);

  //   return { error: err.message };
  // }

  // // To call other named functions:
  // // var result = context.functions.execute("function_name", arg1, arg2);

  // return { result: findResult };
  
  // // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  // var serviceName = "mongodb-atlas";

  // // Update these to reflect your db/collection
  // var dbName = "discovery";
  // var songCollName = "song";
  // var commentCollName = "comment";
  // const db = context.services.get(serviceName).db(dbName);
  // const songCollection = db.collection(songCollName);
  // const commentCollection = db.collection(commentCollName);
  
  const { google } = require("googleapis");
  const express = require("express");
  
  const api_key = "AIzaSyAjzElIPpTfdiLDGr2GnW5RvQFJF7RXktY";
  const CLIENT_ID = "410090683640-0ej81d2hvv36mjv9564jkviga9d45o1c.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  const REDIRECT_URI = "https://data.mongodb-api.com/app/discovery-kdqhu/endpoint/auth/google/callback";
  
  // const oauthConfig = {
  //   client_id: CLIENT_ID,
  //   project_id: "discovery-382221",
  //   auth_uri: "https://accounts.google.com/o/oauth2/auth",
  // token_uri: "https://oauth2.googleapis.com/token",
  // auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  // client_secret: CLIENT_SECRET,
  // redirect_uris: [`https://data.mongodb-api.com/app/discovery-kdqhu/endpoint/playlist/auth/google/callback`],
  // JWTsecret: "secret",
  // scopes: [
  //   "https://www.googleapis.com/auth/userinfo.email",
  //   "https://www.googleapis.com/auth/userinfo.profile",
  //   "openid"
  // ]
  // };
  
  // const OAuth2 = google.auth.OAuth2;
  // const oauth2Client = new OAuth2(
  //   oauthConfig.client_id,
  //   oauthConfig.client_secret,
  //   oauthConfig.redirect_uris[0]
  // );
  
  // const realm_app_id = "discovery-kdqhu";
  // const realmApp = new Realm.app({
  //   id: realm_app_id
  // });
  
  
  const app = express();
  const client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  
  app.get('/auth', (req, res) => {
    // Generate the URL for the consent dialog.
    const authUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email']
    });
  
    // Redirect the user to the consent dialog.
    // After the user grants access, they will be redirected to the callback URL.
    res.redirect(authUrl);
  });
  
  const playlist_id = "PLjflttNTZpythjMh02YCBiDDCrZHjfPi_";
  
  async function fetchPlaylistItems() {
    const youtube = google.youtube("v3");
    const playlist_items = await youtube.playlistItems.list({
      key: api_key,
      part: "contentDetails",
      playlistId: playlist_id
    });
    
    return playlist_items.data.items[0].contentDetails.videoId;
  }
  
  try {
    const playlist = await fetchPlaylistItems();
    console.log(playlist);
  } catch(err) {
    console.error("Playlist fetch failed", err);
  }
};