exports = async function(username){
  /**
   * @param {string} username - the username to be added
   * @return {object} - *user* User object and optional string *error* message
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
    if (findResult) {
      return {user: null, error: "Username is taken!"};
    } 
    // username not in db so add it
    else {
      findResult = await collection.insertOne(
        {
          "username": username, "name": username
        });
    }

  } catch(err) {
    
    console.log("Error occurred while executing findOne:", err.message);

    return {user: null, error: err.message };
  }

  // To call other named functions:
  // var result = context.functions.execute("function_name", arg1, arg2);

  return { user: findResult };
};