import React, { useEffect } from "react";
import {
  ADD_REVIEW_REACTION,
  UPDATE_REVIEW_REACTION,
} from "../queries/ReviewReactionQuery";
import { realmFetchReviewReactions } from "../utils/realmDB";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRealmApp } from "../contexts/RealmApp";
import { BSON } from "realm-web";
import ReactionList from "./design-system/ReactionBadge";

export default function ReviewReactions({ reviewId }) {
  const { currentUser } = useRealmApp();
  const [reviewReactionCounts, setReviewReactionCounts] = useState({});
  // add reaction
  const [addReaction] = useMutation(ADD_REVIEW_REACTION);
  // update reaction
  const [updateReaction, { error: updateReactionError }] = useMutation(
    UPDATE_REVIEW_REACTION
  );
  useEffect(() => {
    realmFetchReviewReactions({
      currentUser,
      reviewId,
      setReviewReactionCounts,
    });
  }, [currentUser, reviewId]);
  //  fetch reaction
  // const { data: reactionList, refetch } = useQuery(FETCH_REACTIONS, {
  //   variables: { song_id: new BSON.ObjectId(songId) },
  //   onCompleted: () => {
  //     console.log(reactionList);
  //     const counts = reactionList.getReactionCounts.reduce(
  //       (obj, { reaction_unicode, count }) => ({
  //         ...obj,
  //         [reaction_unicode]: count,
  //       }),
  //       {}
  //     );
  //     console.log(counts);
  //     setReactionCounts(counts);
  //   },
  //   onError: (error) => console.log(error),
  // });

  const reactToReview = (reactionEmoji) => {
    //  try adding first
    addReaction({
      variables: {
        user_id: new BSON.ObjectId(currentUser.id),
        review_id: new BSON.ObjectId(reviewId),
        reaction: reactionEmoji,
      },
      onCompleted: async (updateData) => {
        await realmFetchReviewReactions({
          currentUser,
          reviewId,
          setReviewReactionCounts,
        });
      },
      onError: (e) => {
        // if adding doesn't work then try updating the reaction
        updateReaction({
          variables: {
            user_id: new BSON.ObjectId(currentUser.id),
            review_id: new BSON.ObjectId(reviewId),
            reaction: reactionEmoji,
          },
          onCompleted: async (updateData) => {
            await realmFetchReviewReactions({
              currentUser,
              reviewId,
              setReviewReactionCounts,
            });
          },
          onError: () => console.log(updateReactionError),
        });
      },
    });
  };

  return (
    <ReactionList
      handleReact={reactToReview}
      reactionCount={reviewReactionCounts}
    />
  );
}
