import { BSON } from "realm-web";

export async function realmFetch({ currentUser, songId, setReactionCounts }) {
  var serviceName = "mongodb-atlas";
  // Update these to reflect your db/collection
  var dbName = "discovery";
  var collName = "songReaction";
  const db = currentUser.mongoClient(serviceName).db(dbName);
  const collection = db.collection(collName);
  try {
    const res = await collection.aggregate([
      {
        $match: {
          song_id: new BSON.ObjectId(songId),
        },
      },
      { $group: { _id: "$reaction_unicode", count: { $sum: 1 } } },
      { $project: { reaction_unicode: "$_id", count: 1, _id: 0 } },
    ]);
    const counts = res.reduce(
      (obj, { reaction_unicode, count }) => ({
        ...obj,
        [reaction_unicode]: count,
      }),
      {}
    );
    setReactionCounts(counts);
  } catch (error) {
    console.error("Error aggregating reactions:", error);
  }
}

export async function realmFetchS({ currentUser, submissionId, setSubmissionReactionCounts }) {
  var serviceName = "mongodb-atlas";
  // Update these to reflect your db/collection
  var dbName = "discovery";
  var collName = "submissionReaction";
  const db = currentUser.mongoClient(serviceName).db(dbName);
  const collection = db.collection(collName);
  try {
    const res = await collection.aggregate([
      {
        $match: {
          submission_id: new BSON.ObjectId(submissionId),
        },
      },
      { $group: { _id: "$reaction_unicode", count: { $sum: 1 } } },
      { $project: { reaction_unicode: "$_id", count: 1, _id: 0 } },
    ]);
    const counts = res.reduce(
      (obj, { reaction_unicode, count }) => ({
        ...obj,
        [reaction_unicode]: count,
      }),
      {}
    );
    setSubmissionReactionCounts(counts);
  } catch (error) {
    console.error("Error aggregating submission reactions:", error);
  }
}
