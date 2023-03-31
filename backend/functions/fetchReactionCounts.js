
/*
  This function is run when a GraphQL Query is made requesting your
  custom field name. The return value of this function is used to
  populate the resolver generated from your Payload Type.

  This function expects the following input object:

  {
    "type": "object",
    "title": "ReactionInput",
    "properties": {
      "song_id": {
        "type": "ObjectId"
      }
    },
    "required": ["song_id"]
  }

  And the following payload object:

  {
  "type": "array",
  "title": "ReactionPayload",
  "items": {
    "bsonType": "object",
    "properties": {
      "reaction": {
        "bsonType": "string"
      },
      "count": {
        "bsonType": "int"
        }
      }
    }
  }
*/

exports = async (input) => {
   // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";
  console.log("Input recieved: ", input)
  // Update these to reflect your db/collection
  var dbName = "discovery";
  var collName = "songReaction";
  const db = context.services.get(serviceName).db(dbName);
  const collection = db.collection(collName);
  var result = await collection.aggregate([
  { $match: { song_id: input.song_id} },
  { $group: { _id: '$reaction_unicode', count: { $sum: 1 } } },
  { $project: { reaction_unicode: '$_id', count: 1, _id: 0 } }
])
  .toArray()
  .catch(error => {
    console.error('Error aggregating reactions:', error);
  })
  console.log("Result is: ", result)
  return result;
};
