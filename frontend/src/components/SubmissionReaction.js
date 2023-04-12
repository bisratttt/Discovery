import React, { useEffect } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import {
  ADD_SUBMISSION_REACTION,
  UPDATE_SUBMISSION_REACTION,
} from "../queries/SubmissionReactionQuery";
import { useRealmApp } from "../contexts/RealmApp";
import { BSON } from "realm-web";
import { realmFetchS } from "../utils/realmDB";
import { useFetchData } from "../contexts/FetchData";

const SubmissionReactionButton = ({ emoji, count, handleClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonClick = () => {
    setIsAnimating(true);
    handleClick();
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  return (
    <motion.div
      className="d-flex flex-column position-relative"
      initial={{ scale: 1 }}
      animate={isAnimating ? { scale: 1.1 } : { scale: 1 }}
    >
      <Button
        variant="link"
        onClick={handleButtonClick}
        className="p-0 reaction-button"
      >
        <span
          role="img"
          aria-label={emoji}
          style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)" }}
        >
          {emoji}
        </span>
      </Button>
      <div className="position-absolute bottom-0 end-0 reaction-badge">
        {count}
      </div>
    </motion.div>
  );
};

export default function SubmissionReaction({ submissionId }) {
  const { currentUser } = useRealmApp();
  const reactionOrder = ["❤️", "🔥", "👍", "👎"];
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
    <Card bg="dark" text="white" id="reaction-card" className="mb-2">
      <Row>
        <Col
          xs={12}
          className="d-flex align-items-center justify-content-around"
        >
          {reactionOrder.map((emoji) => (
            <SubmissionReactionButton
              key={emoji}
              emoji={emoji}
              count={submissionReactionCounts[emoji] || 0}
              handleClick={() => reactToSong(emoji)}
            />
          ))}
        </Col>
      </Row>
    </Card>
  );
}
