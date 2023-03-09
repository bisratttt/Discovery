exports = async function(username){
  /**
   * @param {string} username - the username to be removed
   * @return {object} - *result* boolean and optional string *error* message
   *          
   */
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "discovery";
  var collName = "user";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  var findResult;
  try {

    // look for the username in db
    findResult = await collection.findOne(
      { "username": username},
    );
    if (!findResult) {
      return {deleted: false, error: "Username cannot be removed!"};
    } 
    // username in db so delete it
    else {
      findResult = await collection.deleteOne(
        {
          "username": username
        });
    }

  } catch(err) {
    
    console.log("Error occurred while executing findOne:", err.message);

    return {deleted: false, error: err.message };
  }

  return { deleted: true };
};