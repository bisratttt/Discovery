import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import { Row, Col, Dropdown, ListGroup } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { getMetaphorialTime } from "../utils/utils";

export default function SongSubmission({
  username,
  song_name,
  artist,
  note,
  time,
}) {
  const submissionRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  let dateTime = getMetaphorialTime(time);
  return (
    <ListGroup.Item
      className={`${
        isHidden ? "hidden" : "visible"
      } row d-flex align-items-start
      justify-content-between text-white m-0 p-0 pt-2`}
      style={{
        backgroundColor: "rgba(0,0,0,0.2)",
        borderBottom: "solid rgba(255,255,255,0.5) 0.01rem",
      }}
    >
      <Col xs={2}>
        <FontAwesomeIcon icon={faPlay} size="3x" />
      </Col>
      <Col xs={10}>
        <Row>
          <Col
            xs={9}
            className="d-flex justify-content-start align-items-center overflow-hidden"
            style={{ fontSize: "1.2rem" }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            {isHovered ? (
              <Marquee gradient={false} pauseOnClick={true}>
                <span className="me-4">
                  {song_name} - {artist}
                </span>
              </Marquee>
            ) : (
              <span className="text-truncate">
                {song_name} - {artist}
              </span>
            )}
          </Col>

          <Col xs={3}>
            <small style={{ fontSize: "0.75rem" }} className="text-muted">
              {dateTime}
            </small>
          </Col>
        </Row>
        <Row style={{ fontSize: "0.9rem" }}>
          <Col
            xs={1}
            className="d-flex justify-content-end align-items-start pe-1"
          >
            <Avatar textSizeRatio={2.1} name={username} size="20" round />
          </Col>
          <Col className="d-flex justify-content-start align-items-start ps-0 pe-2 text-start">
            {username}
          </Col>
        </Row>
        <Row>
          <Col
            className="d-flex justify-content-start p-1 text-start rounded-2 me-3 mt-1 mb-2"
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
