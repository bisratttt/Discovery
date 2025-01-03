exports = async function(changeEvent) {
  /*
    A Database Trigger will always call a function with a changeEvent.
    Documentation on ChangeEvents: https://www.mongodb.com/docs/manual/reference/change-events

    Access the _id of the changed document:
    const docId = changeEvent.documentKey._id;

    Access the latest version of the changed document
    (with Full Document enabled for Insert, Update, and Replace operations):
    const fullDocument = changeEvent.fullDocument;

    const updateDescription = changeEvent.updateDescription;

    See which fields were changed (if any):
    if (updateDescription) {
      const updatedFields = updateDescription.updatedFields; // A document containing updated fields
    }

    See which fields were removed (if any):
    if (updateDescription) {
      const removedFields = updateDescription.removedFields; // An array of removed fields
    }

    Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

    Access a mongodb service:
    const collection = context.services.get("mongodb-atlas").db("discovery").collection("userSongSuggestion");
    const doc = collection.findOne({ name: "mongodb" });

    Note: In Atlas Triggers, the service name is defaulted to the cluster name.

    Call other named functions if they are defined in your application:
    const result = context.functions.execute("function_name", arg1, arg2);

    Access the default http client and execute a GET request:
    const response = context.http.get({ url: <URL> })

    Learn more about http client here: https://www.mongodb.com/docs/atlas/app-services/functions/context/#context-http
  */
  const docId = changeEvent.documentKey._id;
  const collection = context.services.get("mongodb-atlas").db("discovery").collection("userSongSuggestion");
  let replacement = null;
  let youtubeID = null;
  try {
      youtubeID = await context.functions.execute('searchYoutubeSong', changeEvent.fullDocument.song_name + " " + changeEvent.fullDocument.artist );
      console.log("SOng submission trigger")
      console.log("Document: ", changeEvent.fullDocument)
      
      replacement = {
        username: changeEvent.fullDocument.username,
        user_id: changeEvent.fullDocument.user_id,
        song_name: changeEvent.fullDocument.song_name,
        artist: changeEvent.fullDocument.artist,
        note: changeEvent.fullDocument.note,
        youtube_id: youtubeID,
        time: new Date()
      };
      
     // await collection.UpdateOne({ _id: docId },  
     //{ $set: {time: new Date(), youtube_id: youtubeID}});
    
    await collection.replaceOne({ _id: docId }, replacement);
  } catch(err) {
    console.error("There was an error adding/updating the time", err)
    
  }
};
