import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useMutation } from "@apollo/client";
import {
  ADD_SUBMISSION_REACTION,
  UPDATE_SUBMISSION_REACTION,
} from "../queries/SubmissionReactionQuery";
import { useRealmApp } from "../contexts/RealmApp";
import { BSON } from "realm-web";
import { realmFetchS } from "../utils/realmDB";
import ReactionList from "./design-system/ReactionBadge";

export default function SubmissionReaction({ submissionId }) {
  const { currentUser } = useRealmApp();
  const [submissionReactionCounts, setSubmissionReactionCounts] = useState({});
  // add reaction
  const [addReaction] = useMutation(ADD_SUBMISSION_REACTION);
  // update reaction
  const [updateReaction, { error: updateReactionError }] = useMutation(
    UPDATE_SUBMISSION_REACTION
  );
  useEffect(() => {
    realmFetchS({
      currentUser,
      submissionId,
      setSubmissionReactionCounts,
    });
  }, [currentUser, submissionId]);
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

  const reactToSong = (reactionEmoji) => {
    //  try adding first
    addReaction({
      variables: {
        user_id: new BSON.ObjectId(currentUser.id),
        submission_id: new BSON.ObjectId(submissionId),
        reaction: reactionEmoji,
      },
      onCompleted: async (updateData) => {
        await realmFetchS({
          currentUser,
          submissionId,
          setSubmissionReactionCounts,
        });
      },
      onError: (e) => {
        // if adding doesn't work then try updating the reaction
        updateReaction({
          variables: {
            user_id: new BSON.ObjectId(currentUser.id),
            submission_id: new BSON.ObjectId(submissionId),
            reaction: reactionEmoji,
          },
          onCompleted: async (updateData) => {
            await realmFetchS({
              currentUser,
              submissionId,
              setSubmissionReactionCounts,
            });
          },
          onError: () => console.log(updateReactionError),
        });
      },
    });
  };

  const isSmallScreen = useMediaQuery("(max-width:850px)");
  return (
    <ReactionList
      handleReact={reactToSong}
      reactionCount={submissionReactionCounts}
    />
  );
}
