import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row, Col, ListGroup } from "react-bootstrap";
import { useMediaQuery } from "@mui/material";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";
import { useToggleComponents } from "../contexts/ToggleComponents";
import { FETCH_SUBMISSIONS } from "../queries/SongSubmissionQuery";
import SongSubmission from "./SongSubmission";
import { useRealmApp } from "../contexts/RealmApp";
import SubmissionWall from "./SubmissionWall";

const LIMIT = 100;
const LAST_TIME = new Date(0);
export default function SongSubmissionList() {
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [intervalId, setIntervalId] = useState(null);
  const { setOpenSongSubmissionList } = useToggleComponents();
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
  //     refetch();
  //   }, 5000);

  //   setIntervalId(id);

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [intervalId]);
  return (
    <Card
      id="submission-card"
      className={`${
        isSmallScreen && "mb-2"
      } rounded-3 border-0 position-relative`}
    >
      {isSmallScreen && (
        <Card.Header
          className="text-white mt-3 text-start"
          style={{ zIndex: "11" }}
        >
          <h2>Community</h2>
        </Card.Header>
      )}
      {isBlurred && <SubmissionWall refetch={refetch} />}
      <Card.Body
        id="submission-body"
        className={`border-0 justify-content-center align-items-center p-0 ${
          isBlurred && "blur"
        }`}
        style={{
          height: isSmallScreen ? "81dvh" : "85dvh",
          overflowY: "scroll",
        }}
      >
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <ListGroup className="m-0 p-0">
            {data?.userSongSubmissions.map((sub) => {
              return <SongSubmission key={sub._id} {...sub} />;
            })}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}
