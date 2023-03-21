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
} from "react-bootstrap";
import { useMediaQuery } from "@mui/material";
import EmojiPicker, { Theme } from "emoji-picker-react";
import CommentB from "./CommentB";
import { faCirclePlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ADD_COMMENT, FETCH_COMMENTS } from "../queries/CommentQuery";
import { useMutation, useQuery } from "@apollo/client";
import { useRealmApp } from "../contexts/RealmApp";
import { BSON } from "realm-web";
import { useErrorAlert } from "../hooks/useErrorAlert";

export default function CommentCardB({ songId }) {
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [comment, setComment] = useState("");
  const [lastTime, setLastTime] = useState(new Date(0));
  const [limit, setLimit] = useState(100);
  const [intervalId, setIntervalId] = useState(null);

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
    if (event.key === 'Enter')
    {
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
  }

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
    <Card id="comment-card" className={`${isSmallScreen && "mb-2"}`}>
      <Card.Body id="comment-body" className="p-0">
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <ListGroup className="m-0">
            {data.comments.map((com) => {

              return <CommentB key={com._id} {...com} setComment={setComment}/>;
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
          <Col className="pe-0 ps-0">
            {openEmoji && (
              <div style={{ position: "absolute", top: "150px", zIndex: 999 }}>
                <EmojiPicker
                  height={400}
                  width={300}
                  onEmojiClick={handleEmojiClick}
                  theme={Theme.AUTO}
                  previewConfig={{ showPreview: false }}
                />
              </div>
            )}
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon
                  className="white-icon"
                  onClick={() => setOpenEmoji(!openEmoji)}
                  icon={faFaceSmile}
                  size="lg"
                />
              </InputGroup.Text>
              <Form.Control
                type="text"
                disabled={mutationLoading}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Enter your comment"
                className="col-xs-10"
                onKeyDown={(event) => handleEnterKey(event)}
              />
              <InputGroup.Text className="rounded-0">
                <Button
                  variant="transparent"
                  className="comment-btn text-white"
                  disabled={mutationLoading}
                  onClick={() => addComment({
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
                  })
                }
                >
                  Post
                </Button>
              </InputGroup.Text>
            </InputGroup>
            {mutationError && <NoPostErrorAlert />}
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}


