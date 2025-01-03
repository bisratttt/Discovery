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
  const { auth } = require("google-auth-library");
  
  const API_KEY = "AIzaSyAjzElIPpTfdiLDGr2GnW5RvQFJF7RXktY";
  const CLIENT_ID = "410090683640-0ej81d2hvv36mjv9564jkviga9d45o1c.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  
  
  const playlist_id = "PLjflttNTZpythjMh02YCBiDDCrZHjfPi_";
  
  function authenticate() {
    return auth.getAuthInstance()
    .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
    .then(function() { console.log("Sign-in successful"); },
      function(err) { console.error("Error signing in", err); });
  }
  
  function loadClient() {
    google.setApiKey(API_KEY);
    return google.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function() { console.log("GAPI client loaded for API"); },
        function(err) { console.error("Error loading GAPI client for API", err); });
  }
  
  function execute() {
    return google.youtube("v3").playlistItems.list({
      "part": "contentDetails",
      "maxResults": 10,
      "playlistId": playlist_id
    })
      .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      }, function(err) { console.error("Execute error", err); });
  }
  
  // async function fetchPlaylistItems() {
  //   const youtube = google.youtube("v3");
  //   const playlist_items = await youtube.playlistItems.list({
  //     key: API_KEY,
  //     part: "contentDetails",
  //     playlistId: playlist_id,
  //     maxResults: 10
  //   });
    
  //   return playlist_items.data.items;
  // }
  
  try {
    authenticate();
    const playlist = await execute();
    console.log(playlist);
  } catch(err) {
    console.error("Playlist fetch failed", err);
  }
};