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
  
  const credentials = {
    "type": "service_account",
    "project_id": "discovery-382221",
    "private_key_id": "a8f6ffa82032f7c131676fd3b13946b356f8bfee",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxotryX6qquV+X\nCLZC1zh9K9aVmaI83Hkq4kWmJr0CvEdDnvsiVO3x+THg5LVMrvcW0sl1AQBVlUsA\neKfiLsDbbGiyCKTGvci/Fr+WEx3XX4qAxuuVLwXInBJwfHqzDj9mhAwIJlXBheg+\n88WyQ5RFuNqhSaS61SbHpIy1G8x3wvAQGJ5+Gh3qVu9RdgwBGNczLJUL/D1G6v+a\nPFzLji0hmadRX/QewzX6JpuDuHf97rNVrRczeBWe/hrR0y0Gl4uCm42z7OD9Tq9J\neII/LTZCn2NKvbMQiUaj+8NcYuUucq8i/o1dPO1ZstjIJbJsuNFssgVmzWh6VnNU\n+S6VkjJFAgMBAAECggEAK1gEyyvHOdGyLqkISg54YOiLu2SptuaIJUvheU2OBKca\nz3fxKNsm1Up8HndH+r5dmcLUt9lG8tsTGjoWouTMF65f7IMZ68mevGvJU032U9li\n8xG2paf75guZHzvsd5jkJPhW9D0gYzBwrz2tsVX2jb2xkTXmPVVp2UCAOefe0CDG\nxcFjYL6G+EcQOzAkeBnSPe2UTcjodamtwYdxzphk4B08cjEauTdOLSYXX+OLkOms\nM2IFUzA1JMEO00qO8ZnCWM2DA0cb3XywWXMGsx5VkMK9B/FG4nbvLiyW5yOKwjS3\nFZUAjcMeRa4k8d5GMfglQz6Ddf07RksrzBpBz1ouIQKBgQDv/0GVeiMlFbhgNDqX\nBqmluwGuPEnmj4VRwSNyhm5EqDK/0wSTxPb4+Oq3scgjaeb+aoIafpDlmbZHE0Jx\n4AI/Ulf0UVPxzhrioac4LZYnd1qFJ/LYqe1DFlQIeN9A9+KCxRX0XWPKgLzStmLY\ntt3nK12QT1YcTUTB5jvFMt7XoQKBgQC9exl6OCKBHsV55w6AeP+5CRoJY24W6ZEA\nBYrcLHW+VswZQQK1kHJ9rlD6IfGeq+MoKzQRm1MW2wCSJZ2WGZOraFlXjXFg3ngl\nvfaw/6npxKwr6mFwMNzpOq1wntZpkKo0937FBO2fbkzPJasj9H/8UZ9VxkVBBH3m\nGNUAgKAIJQKBgGgItWxPcpar0K3bVh6Lo9SUuQjHV52bT0Z+O5h0j64xXzZqCczo\nj8qjVFPmvAQl7x0QHG/Rt4vf0vUCc0Ybvb2nOztMWeAy4NKnEm62zCU1hsa753hm\nSNRRBIJbqyNlkQnw1zCDnzN0FOYea8DXnF+OG9PnoENKd2i6HeTAxXqhAoGADeLu\nrBFfHf1mVZfEbU/w1du/5748vDsj4E+HrLkpa+iqjpNAIpRSf7l9v8crEQjh3fjE\nmSG8BinIse1FzlFTjDVajtsT2xiSz5lLcg9aoYJDZ/iGaZV7KzCcs2tApX3vq3AT\n/1ZsH8oSoP/OuhTaKGDG/59HRguROoLJYX8Lu20CgYEAnFMvcFwjaOlvUeZnhhyX\nCfCQ5U5AUnE60ilboZa9P7hpmO1iqAgdK3M6KICqsuTmlVMwXPqEoSbarwmIf3to\nNxMibE3AfiytrtS0bK5jvmnlu9X6o2KeQ6NnT3i3ksNlChlFMSBGGE+xyD+0owBO\n3bXbzLYINaZQY3kzMpi7ps8=\n-----END PRIVATE KEY-----\n",
    "client_email": "disc-music@discovery-382221.iam.gserviceaccount.com",
    "client_id": "108049425113630360303",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/disc-music%40discovery-382221.iam.gserviceaccount.com"
  };
  
  try {
    const client = auth.fromJSON(credentials);
    client.scopes = ['https://www.googleapis.com/auth/youtube'];
    const url = `https://www.googleapis.com/youtube/v3/projects/${credentials.project_id}`;
    const res = await client.request({url});
    console.log(res.data);
  }
  catch(err) {
    console.error("Authentication.", err);
  }
  
  
  const playlist_id = "PLjflttNTZpythjMh02YCBiDDCrZHjfPi_";
  
  async function fetchPlaylistItems() {
    const youtube = google.youtube("v3");
    const playlist_items = await youtube.playlistItems.list({
      key: API_KEY,
      part: "contentDetails",
      playlistId: playlist_id,
      maxResults: 10
    });
    
    return playlist_items.data.items;
  }
  
  try {
    const playlist = await fetchPlaylistItems();
    console.log(playlist);
  } catch(err) {
    console.error("Playlist fetch failed", err);
  }
};