import React, { useEffect } from "react";
import { Card, Col, Row, Button, Image } from "react-bootstrap";
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

const SubmissionReactionButton = ({
  emoji,
  count,
  handleClick,
  image = "",
  staticImage = "",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const handleButtonClick = () => {
    setIsAnimating(true);
    handleClick();
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  return (
    <motion.div
      className="d-flex flex-row justify-content-center align-items-center position-relative mx-1 py-0 px-1 rounded-3"
      initial={{ scale: 1 }}
      animate={isAnimating ? { scale: 1.1 } : { scale: 1 }}
      style={{ backgroundColor: "rgba(30,30,30, 0.7)" }}
    >
      <Col>
        <Button
          variant="link"
          onClick={handleButtonClick}
          className="p-0 pe-1 reaction-button bg-transparent"
        >
          {image !== "" ? (
            <Image
              height={25}
              width="auto"
              src={!isHover ? staticImage : image}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            />
          ) : (
            <span
              role="img"
              aria-label={emoji}
              style={{ fontSize: "clamp(1rem, 5vw, 1.2rem)" }}
            >
              {emoji}
            </span>
          )}
        </Button>
      </Col>
      <Col>
        <div>{count}</div>
      </Col>
    </motion.div>
  );
};

export default function SubmissionReaction({ submissionId }) {
  const { currentUser } = useRealmApp();
  const reactionOrder = {
    "❤️": "/emojis/heart.webp",
    "🔥": "/emojis/fire.webp",
    "👍": "/emojis/thumbs_up.webp",
    "👎": "/emojis/thumbs_down.webp",
    "😠": "/emojis/angry.webp",
  };
  const reactionStaticOrder = {
    "❤️": "/emojis/static/heart.avif",
    "🔥": "/emojis/static/fire.avif",
    "👍": "/emojis/static/thumbs_up.avif",
    "👎": "/emojis/static/thumbs_down.avif",
    "😠": "/emojis/static/angry.avif",
  };
  // const reactionOrder = ["❤️", "🔥", "👍", "👎"];
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
      <Row className="mx-0 px-0">
        <Col
          xs={12}
          className="d-flex align-items-center justify-content-between"
        >
          {Object.entries(reactionOrder).map(([emoji, image]) => (
            <SubmissionReactionButton
              key={emoji}
              emoji={emoji}
              image={image}
              staticImage={reactionStaticOrder[emoji]}
              count={submissionReactionCounts[emoji] || 0}
              handleClick={() => reactToSong(emoji)}
            />
          ))}
        </Col>
      </Row>
    </Card>
  );
}
