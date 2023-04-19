import React, { useEffect, useState } from "react";
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
import ReviewWriteModal from "./ReviewWriteModal";
import { useToggleComponents } from "../contexts/ToggleComponents";
import { useRealmApp } from "../contexts/RealmApp";
const LIMIT = 100;
const LAST_TIME = new Date(0);
export default function CommentCard({ songId }) {
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [intervalId, setIntervalId] = useState(null);
  const [reviewWriteModal, setReviewWriteModal] = useState(false);
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const { setOpenReview, setOpenLoginModal } = useToggleComponents();
  const { currentUser } = useRealmApp();
  const { loading, error, data, fetchMore, refetch } = useQuery(
    FETCH_COMMENTS,
    {
      variables: { song_id: songId, limit: LIMIT, lastTime: LAST_TIME },
    }
  );
  // checks if the current user has reviewed a song
  useEffect(() => {
    const reviewed = data?.comments?.some(
      (comment) => comment.username === currentUser.profile.email
    );
    setUserHasReviewed(reviewed);
  }, [data, currentUser]);
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
          <Col
            xs={4}
            className="d-flex justify-content-start align-items-start"
          >
            <Button
              size="lg"
              className="bg-transparent border-0 p-0"
              onClick={() => setOpenReview((openReview) => !openReview)}
            >
              {!isSmallScreen ? (
                <FontAwesomeIcon icon={faXmark} size="xl" />
              ) : (
                <h2>Reviews</h2>
              )}
            </Button>
          </Col>
          {!userHasReviewed && (
            <Col className="d-flex justify-content-end">
              <Button
                id="review-button"
                size="sm"
                className="text-white text-center text-decoration-none rounded-3 border-white py-2 px-3"
                onClick={() => {
                  if (currentUser.providerType === "api-key") {
                    setOpenLoginModal(true);
                  } else {
                    setReviewWriteModal((reviewModal) => !reviewModal);
                  }
                }}
              >
                <FontAwesomeIcon icon={faPenFancy} className="pe-2" />
                Review this song
              </Button>
            </Col>
          )}

          <ReviewWriteModal
            refetch={refetch}
            songId={songId}
            show={reviewWriteModal}
            onHide={() => setReviewWriteModal((reviewModal) => !reviewModal)}
          />
        </Row>
      </Card.Header>
      <Card.Body
        id="comment-body"
        className="p-0"
        style={{ height: isSmallScreen ? "85vh" : "77vh" }}
      >
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <ListGroup className="m-0">
            {data.comments.map((com) => {
              return <CommentB key={com._id} {...com} />;
            })}
            {data.comments.length === LIMIT && (
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
