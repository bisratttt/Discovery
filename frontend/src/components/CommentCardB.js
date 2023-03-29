import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row, Col, ListGroup } from "react-bootstrap";
import { useMediaQuery } from "@mui/material";
import CommentB from "./CommentB";
import {
  faArrowLeft,
  faCirclePlus,
  faPenFancy,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FETCH_COMMENTS } from "../queries/CommentQuery";
import { useQuery } from "@apollo/client";
import { useRealmApp } from "../contexts/RealmApp";
import { BSON } from "realm-web";
import ReviewWriteModal from "./ReviewWriteModal";
import { useToggleComponents } from "../contexts/ToggleComponents";

export default function CommentCardB({ songId }) {
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [comment, setComment] = useState("");
  const [lastTime, setLastTime] = useState(new Date(0));
  const [limit, setLimit] = useState(100);
  const [intervalId, setIntervalId] = useState(null);
  const [reviewWriteModal, setReviewWriteModal] = useState(false);
  const { setOpenReview } = useToggleComponents();
  const { currentUser } = useRealmApp();
  const { loading, error, data, fetchMore, refetch } = useQuery(
    FETCH_COMMENTS,
    {
      variables: { limit: limit, lastTime: lastTime },
    }
  );

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
    <Card
      id="comment-card"
      className={`${isSmallScreen && "mb-2"} rounded-3 border-0`}
    >
      <Card.Header id="comment-footer" className="border-0">
        <Row>
          <Col className="d-flex justify-content-start align-items-start">
            <Button
              size="lg"
              className="bg-transparent border-0 p-0"
              onClick={() => setOpenReview((openReview) => !openReview)}
            >
              {isSmallScreen ? (
                <FontAwesomeIcon icon={faArrowLeft} />
              ) : (
                <FontAwesomeIcon icon={faXmark} />
              )}
            </Button>
          </Col>
          <Col className="d-flex justify-content-start">
            <Button
              size={isSmallScreen ? "sm" : "lg"}
              className="text-white text-center text-decoration-none rounded-3 border-white w-100"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: isSmallScreen
                  ? "0.8rem 0.9rem 0.8rem"
                  : "0.8rem 1rem 0.8rem",
              }}
              onClick={() => setReviewWriteModal((reviewModal) => !reviewModal)}
            >
              <FontAwesomeIcon icon={faPenFancy} className="pe-2" />
              Review this song
            </Button>
          </Col>

          <ReviewWriteModal
            songId={songId}
            show={reviewWriteModal}
            onHide={() => setReviewWriteModal((reviewModal) => !reviewModal)}
          />
        </Row>
      </Card.Header>
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
    </Card>
  );
}
