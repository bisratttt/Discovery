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

export async function realmFetchS({
  currentUser,
  submissionId,
  setSubmissionReactionCounts,
}) {
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

export async function realmFetchSubmissionReactions({
  currentUser,
  submissionId,
  setSubmissionReactionCounts,
}) {
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
      {
        $group: {
          _id: "$reaction_unicode",
          count: { $sum: 1 },
          user_ids: { $addToSet: "$user_id" },
        },
      },
      {
        $project: {
          reaction_unicode: "$_id",
          count: 1,
          user_ids: 1,
          _id: 0,
        },
      },
    ]);
    const counts = res.reduce(
      (obj, { reaction_unicode, count, user_ids }) => ({
        ...obj,
        [reaction_unicode]: { count, user_ids: new Set(user_ids) },
      }),
      {}
    );
    setSubmissionReactionCounts(counts);
  } catch (error) {
    console.error("Error aggregating submission reactions:", error);
  }
}

export async function realmFetchReviewReactions({
  currentUser,
  reviewId,
  setReviewReactionCounts,
}) {
  var serviceName = "mongodb-atlas";
  // Update these to reflect your db/collection
  var dbName = "discovery";
  var collName = "reviewReaction";
  const db = currentUser.mongoClient(serviceName).db(dbName);
  const collection = db.collection(collName);
  try {
    const res = await collection.aggregate([
      {
        $match: {
          review_id: new BSON.ObjectId(reviewId),
        },
      },
      {
        $group: {
          _id: "$reaction_unicode",
          count: { $sum: 1 },
          user_ids: { $addToSet: "$user_id" },
        },
      },
      {
        $project: {
          reaction_unicode: "$_id",
          count: 1,
          user_ids: 1,
          _id: 0,
        },
      },
    ]);
    const counts = res.reduce(
      (obj, { reaction_unicode, count, user_ids }) => ({
        ...obj,
        [reaction_unicode]: { count, user_ids: new Set(user_ids) },
      }),
      {}
    );
    setReviewReactionCounts(counts);
  } catch (error) {
    console.error("Error aggregating review reactions:", error);
  }
}
