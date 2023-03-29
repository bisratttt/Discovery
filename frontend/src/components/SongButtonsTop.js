import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Button } from "react-bootstrap";

export default function SongButtonsTop({
  setOpenReview,
  setOpenSongInfo,
  setOpenSongSubmissionList,
  setShareModal,
}) {
  return (
    <>
      <Col className="d-flex justify-content-start">
        <Button
          style={{
            background: "transparent",
            borderColor: "transparent",
          }}
          onClick={() => {
            setOpenReview(false);
            setOpenSongSubmissionList(false);
            setOpenSongInfo((songInfo) => !songInfo);
          }}
        >
          <FontAwesomeIcon icon={faCircleInfo} size="lg" />
        </Button>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button
          style={{
            background: "transparent",
            borderColor: "transparent",
          }}
          className="ps-1"
          onClick={() => setShareModal(true)}
        >
          <FontAwesomeIcon icon={faShareFromSquare} size="lg" />
        </Button>
      </Col>
    </>
  );
}
