exports = async function(user_id, body, song_id) {
  /**
   * @param {string} user_id - the user_id that is commenting
   * @return {object} - *comment* comment object and optional string *error* message
   *          
   */
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  const dbName = "discovery";
  
  const userCollName = "user";
  const commentCollName = "comment";
  const songCollName = "song";
  
  const db = context.services.get(serviceName).db(dbName);
  // Get a collection from the context
  const userCollection = db.collection(userCollName);
  const commentCollection = db.collection(commentCollName);
  const songCollection = db.collection(songCollName);

  var comment;
  try {
    
    // look for user and song
    const user = await userCollection.findOne({_id: new BSON.ObjectId(user_id)});
    const song = await songCollection.findOne({_id: new BSON.ObjectId(song_id)});
    // cannot find user or song
    if (!user || !song) {
      return {comment: comment, error: "Invalid song or user!"}
    }
    // create the comment
    comment = await commentCollection.insertOne(
      {
        user: user_id, body: body, time: new Date(), song: song_id
      }
      );
    // const retrieveComment = await commentCollection.findOne({_id: new BSON.ObjectId(`${comment["insertedId"]}`)});
    // console.log(`comment time: ${retrieveComment.time}`)
  } catch(err) {
    
    console.log("Error occurred while executing findOne:", err.message);

    return {comment: comment, error: err.message };
  }

  return { comment: comment };
}