import React, { useEffect, useState } from "react";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Form,
  Card,
  Row,
  Col,
  InputGroup,
  ListGroup,
  ButtonGroup,
} from "react-bootstrap";
import { useMediaQuery } from "@mui/material";
import EmojiPicker, { Theme } from "emoji-picker-react";
import CommentB from "./CommentB";
import {
  faCirclePlus,
  faPenFancy,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { ADD_COMMENT, FETCH_COMMENTS } from "../queries/CommentQuery";
import { useMutation, useQuery } from "@apollo/client";
import { useRealmApp } from "../contexts/RealmApp";
import { BSON } from "realm-web";
import { useErrorAlert } from "../hooks/useErrorAlert";
import ReviewWriteModal from "./ReviewWriteModal";

export default function CommentCardB({ songId }) {
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [comment, setComment] = useState("");
  const [lastTime, setLastTime] = useState(new Date(0));
  const [limit, setLimit] = useState(100);
  const [intervalId, setIntervalId] = useState(null);
  const [reviewWriteModal, setReviewWriteModal] = useState(false);

  const { currentUser } = useRealmApp();
  const { loading, error, data, fetchMore, refetch } = useQuery(
    FETCH_COMMENTS,
    {
      variables: { limit: limit, lastTime: lastTime },
    }
  );
  const [
    addComment,
    { loading: mutationLoading, reset, error: mutationError },
  ] = useMutation(ADD_COMMENT);

  const NoPostErrorAlert = useErrorAlert({
    error: mutationError?.message,
    clearError: () => reset(),
  });

  const handleEmojiClick = (emojiData) => {
    const emojiChar = String.fromCodePoint(`0x${emojiData.unified}`); // Convert the Unicode escape sequence to a Unicode character using String.fromCodePoint()
    setComment(comment + emojiChar); // Add the emoji character to the comment state
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      addComment({
        variables: {
          username: currentUser.profile.email,
          owner_id: new BSON.ObjectId(currentUser.id),
          body: comment,
          song: new BSON.ObjectId(songId),
        },
        onCompleted: () => {
          setComment("");
          refetch({
            limit: limit,
            lastTIme: lastTime,
          });
        },
      });
    }
  };

  // // periodically refetch the comments
  // useEffect(() => {
  //   // Start polling the server every 5 seconds
  //   const id = setInterval(() => {
  //     refetch({
  //       limit: limit,
  //       lastTime: lastTime,
  //     });
  //   }, 30000);

  //   setIntervalId(id);

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <Card id="comment-card" className={`${isSmallScreen && "mb-2"} rounded-3`}>
      <Card.Body id="comment-body" className="p-0">
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <ListGroup className="m-0">
            {data.comments.map((com) => {
              return (
                <CommentB key={com._id} {...com} setComment={setComment} />
              );
            })}
            {data.comments.length === limit && (
              <ListGroup.Item>
                <FontAwesomeIcon
                  className="white-icon m-1"
                  onClick={() =>
                    fetchMore({
                      variables: {
                        lastTime: new Date(
                          data.comments[data.comments.length - 1].time
                        ),
                      },
                    })
                  }
                  icon={faCirclePlus}
                  size="lg"
                />
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </Card.Body>
      <Card.Footer id="comment-footer">
        <Row>
          <ButtonGroup>
            <Button
              variant="link"
              size="lg"
              className="text-white text-decoration-none ps-0 pe-5"
              onClick={() => setReviewWriteModal((reviewModal) => !reviewModal)}
            >
              <FontAwesomeIcon icon={faPenFancy} className="pe-3" />
              Review this song
            </Button>
          </ButtonGroup>
          <ReviewWriteModal
            show={reviewWriteModal}
            onHide={() => setReviewWriteModal((reviewModal) => !reviewModal)}
          />
        </Row>
      </Card.Footer>
    </Card>
  );
}
