exports = async function() {
  /*
    A Scheduled Trigger will always call a function without arguments.
    Documentation on Triggers: https://www.mongodb.com/docs/atlas/app-services/triggers/

    Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

    Access a mongodb service:
    const collection = context.services.get(<SERVICE_NAME>).db("<DB_NAME>").collection("<COLL_NAME>");
    const doc = collection.findOne({ name: "mongodb" });

    Note: In Atlas Triggers, the service name is defaulted to the cluster name.

    Call other named functions if they are defined in your application:
    const result = context.functions.execute("function_name", arg1, arg2);

    Access the default http client and execute a GET request:
    const response = context.http.get({ url: <URL> })

    Learn more about http client here: https://www.mongodb.com/docs/atlas/app-services/functions/context/#context-http
  */
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "discovery";
  var songCollName = "song";
  var commentCollName = "comment";
  var songSubmissionCollName = "userSongSuggestion"
  const db = context.services.get(serviceName).db(dbName);
  const songCollection = db.collection(songCollName);
  const commentCollection = db.collection(commentCollName);
  const songSubmissionCollection = db.collection(songSubmissionCollName)
  // removing data from previous day
  try {
    // make previous day album invisible
    await songCollection.updateMany({"is_visible": true}, {$set: {"is_visible": false}});
    // deletes all the comments in the db (for a specific song)
    await commentCollection.deleteMany({});
    // delete all song suggestions from users
    await songSubmissionCollection.deleteMany({});
    console.log("Finished removing data from previous day")
  } catch(err) {
    console.error("Error removing data from previous day: ", err)
    return
  }
  // adding data for new day
  try {
    const spotifyFunctionName = "fetchSpotifySong"
    const youtubeFunctionName = "searchYoutubeSong"
    const songInfoFunctionName = "getDataFromGenius"
    const track = await context.functions.execute(spotifyFunctionName)
    const artists = track.artists.reduce((artistBuilder, artist) => (artistBuilder + artist.name + ' , '), '').slice(0, -3);
    const videoId = await context.functions.execute(youtubeFunctionName, track.name + " " + artists)

    newSong = await songCollection.insertOne({
      album_name: track.album.name,
      artist: artists,
      is_visible: true,
      song_name: track.name,
      spotify_link: track.external_urls.spotify,
      youtube_id: videoId
    });
    
    await context.functions.execute(songInfoFunctionName);
    console.log("Finished adding new song to db")
  } catch(err) {
    console.error("Error adding new song to db: ", err)
    return
  }
};
