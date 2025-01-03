/*
  This function will run after a user is created and is called with an object representing that user.

  This function runs as a System user and has full access to Services, Functions, and MongoDB Data.

  Example below:

  exports = ({ user }) => {
    // use collection that Custom User Data is configured on
    const collection = context.services.get("<SERVICE_NAME>").db("<DB_NAME>").collection("<COLL_NAME>");

    // insert custom data into collection, using the user id field that Custom User Data is configured on
    const doc = collection.insertOne({ <USER_ID_FIELD>: user.id, name: user.data.name });
  };
*/

exports = async (user) => {
  const collection = context.services.get("mongodb-atlas").db("discovery").collection("userPreferences");
  try {
    await collection.insertOne({
                                user_id: new BSON.ObjectId(user.id), 
                                username: user.data.email, 
                                bio: "", 
                                facebook_handle: "", 
                                instagram_handle: "", 
                                tiktok_handle: "", 
                                twitter_handle: "", 
                                youtube_handle: "",
                                applemusic_handle: "",
                                spotify_handle: "",
                                soundcloud_handle: ""
                              });
  } catch(err) {
    console.error("Error creating user preferences: ", err)
    throw err
  }
  return;
};
