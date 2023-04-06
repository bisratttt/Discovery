import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row, Col, ListGroup } from "react-bootstrap";
import { useMediaQuery } from "@mui/material";
import {
  faArrowLeft,
  faCirclePlus,
  faPenFancy,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";
import SongSubmissionModal from "./SongSubmissionModal";
import { useToggleComponents } from "../contexts/ToggleComponents";
import { FETCH_SUBMISSIONS } from "../queries/SongSubmissionQuery";
import SongSubmission from "./SongSubmission";
import { useRealmApp } from "../contexts/RealmApp";

// const LIMIT = 100;
// const LAST_TIME = new Date(0);
export default function SongSubmissionList() {
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  //  const [intervalId, setIntervalId] = useState(null);
  const [songSubmissionModal, setSongSubmissionModal] = useState(false);
  const { setOpenSubmission } = useToggleComponents();
  const { loading, error, data, refetch } = useQuery(
    FETCH_SUBMISSIONS
    // {
    //   variables: { limit: LIMIT, lastTime: LAST_TIME },
    // }
  );
  const { currentUser } = useRealmApp();
  const [isBlurred, setIsBlurred] = useState(true);

  // const usernames = data?.userSongSubmissions?.map((submission) => submission.username) || [];
  // const madeSubmission = usernames.some((username) => username === currentUser.profile.email);

  // if (madeSubmission){
  //   setIsBlurred(false);
  // }

  useEffect(() => {
    const madeSubmission = data?.userSongSubmissions?.some(
      (submission) => submission.username === currentUser.profile.email
    );
    setIsBlurred(!madeSubmission);
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
  console.log(error);
  return (
    <Card
      id="submission-card"
      className={`${
        isSmallScreen && "mb-2"
      } rounded-3 border-0 position-relative`}
    >
      {isBlurred && (
        <>
          <div className="submission-post-button position-absolute rounded-3 w-100 h-100">
            <Button
              size="lg"
              className={`text-white text-center text-decoration-none rounded-3 border-0 w-100 h-100 d-flex align-items-center justify-content-center`}
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
              onClick={() =>
                setSongSubmissionModal((submissionModal) => !submissionModal)
              }
            >
              <FontAwesomeIcon icon={faPenFancy} className="pe-2" />
              Post your Song of the Day!
            </Button>
          </div>
        </>
      )}
      <Card.Body
        id="submission-body"
        className={`border-0 justify-content-center align-items-center p-0 ${
          isBlurred && "blur"
        }`}
      >
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <ListGroup className="m-0">
            {data.userSongSubmissions.map((sub) => {
              return <SongSubmission key={sub._id} {...sub} />;
            })}
          </ListGroup>
        )}
        <SongSubmissionModal
          refetch={refetch}
          show={songSubmissionModal}
          onHide={() =>
            setSongSubmissionModal((submissionModal) => !submissionModal)
          }
        />
      </Card.Body>
    </Card>
  );
}
