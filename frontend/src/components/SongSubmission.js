import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import { Row, Col, Dropdown, ListGroup } from "react-bootstrap";
import Marquee from "react-fast-marquee";

export default function SongSubmission({
  username,
  song_name,
  artist,
  note,
  time,
}) {
  const submissionRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  let dateTime = new Date(time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <ListGroup.Item
      className={`${
        isHidden ? "hidden" : "visible"
      } row d-flex align-items-start
      justify-content-between text-white m-0 p-0 pt-2`}
      style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
    >
      <Col xs={2}>
        <FontAwesomeIcon icon={faPlay} size="3x" />
      </Col>
      <Col>
        <Row>
          <Col
            className="d-flex justify-content-start align-items-center overflow-hidden"
            style={{ fontSize: "1.2rem" }}
          >
            <Marquee gradient={false} pauseOnClick={true}>
              <span>
                {song_name} - {artist}
              </span>
            </Marquee>
          </Col>

          <Col xs={3}>
            <small className="text-muted">{dateTime}</small>
          </Col>
        </Row>
        <Row>
          <Col
            xs={1}
            className="d-flex justify-content-end align-items-start pe-1"
          >
            <Avatar textSizeRatio={2} name={username} size="25" round />
          </Col>
          <Col className="d-flex justify-content-start align-items-start ps-0 pe-2 text-start">
            {username}
          </Col>
        </Row>
        <Row>
          <Col
            className="d-flex justify-content-start p-1 text-start rounded-2 me-3 mt-1"
            style={{
              backgroundColor: "rgba(30,30,30, 0.7)",
              fontSize: "0.8rem",
            }}
          >
            {note}
          </Col>
        </Row>
      </Col>
    </ListGroup.Item>
  );
}
