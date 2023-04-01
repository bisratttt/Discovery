import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import { Row, Col, Dropdown, ListGroup } from "react-bootstrap";

export default function SongSubmission({username, song_name, artist, time }) {
  const [isTruncated, setIsTruncated] = useState(false);
  const submissionRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  let dateTime = new Date(time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <ListGroup.Item
      className={`${isHidden ? "hidden" : "visible"} d-flex align-items-start
      justify-content-between text-white m-0 p-0 pt-2`}
      style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      
    >
      <Col xs={2}>
        <FontAwesomeIcon icon={faPlay} size="3x"/>
      </Col>
      <Col >
        <Row >
          <Col className="d-flex justify-content-start align-items-center" style={{fontSize: "1.2rem"}}>
            {song_name} - {artist}
          </Col>
          <Col xs={3}>
            {dateTime}
          </Col>
        </Row>
        <Row >
          <Col xs={1} className="d-flex justify-content-end align-items-center pe-0">
          <Avatar
            textSizeRatio={2}
            name={username}
            size="25"
            round
          />
          </Col>
          <Col className="d-flex justify-content-start align-items-center ps-1">
          {username}
          </Col>

        </Row>
        <Row >
          This will be notes
        </Row>
      </Col>
    </ListGroup.Item>
  );
}
