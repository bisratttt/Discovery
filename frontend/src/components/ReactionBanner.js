import React from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import { useState } from "react";

export default function ReactionBanner({ albumImage }) {
  const [heartCount, setHeartCount] = useState(10);
  const [fireCount, setFireCount] = useState(20);
  const [thumbsUpCount, setThumbsUpCount] = useState(30);
  const [thumbsDownCount, setThumbsDownCount] = useState(5);
  const [angryCount, setAngryCount] = useState(2);

  const handleHeartClick = () => setHeartCount(heartCount + 1);
  const handleFireClick = () => setFireCount(fireCount + 1);
  const handleThumbsUpClick = () => setThumbsUpCount(thumbsUpCount + 1);
  const handleThumbsDownClick = () => setThumbsDownCount(thumbsDownCount + 1);
  const handleAngryClick = () => setAngryCount(angryCount + 1);

  return (
    <Card bg="dark" text="white" id="reaction-card">
      <Row>
        <Col xs={2}>
          <Card.Img variant="top" className="rounded-0" src={albumImage} />
        </Col>
        <Col
          xs={10}
          className="d-flex align-items-center justify-content-around"
        >
          <div className="d-flex flex-column position-relative">
            <Button
              variant="link"
              onClick={handleHeartClick}
              className="p-0 reaction-button"
              size="lg"
            >
              <span
                role="img"
                aria-label="heart"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              >
                ❤️
              </span>
            </Button>
            <Badge
              bg="success"
              className="position-absolute bottom-0 end-0 reaction-badge"
            >
              {heartCount}
            </Badge>
          </div>
          <div className="d-flex flex-column position-relative">
            <Button
              variant="link"
              onClick={handleFireClick}
              className="p-0 reaction-button"
            >
              <span
                role="img"
                aria-label="fire"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              >
                🔥
              </span>
            </Button>
            <Badge
              bg="success"
              className="position-absolute bottom-0 end-0 reaction-badge"
            >
              {fireCount}
            </Badge>
          </div>
          <div className="d-flex flex-column position-relative">
            <Button
              variant="link"
              onClick={handleThumbsUpClick}
              className="p-0 reaction-button"
            >
              <span
                role="img"
                aria-label="thumbs up"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              >
                👍
              </span>
            </Button>
            <Badge
              bg="success"
              className="position-absolute bottom-0 end-0 reaction-badge"
            >
              {thumbsUpCount}
            </Badge>
          </div>
          <div className="d-flex flex-column position-relative">
            <Button
              variant="link"
              onClick={handleThumbsDownClick}
              className="p-0 reaction-button"
            >
              <span
                role="img"
                aria-label="thumbs down"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              >
                👎
              </span>
            </Button>
            <Badge bg="success" className="position-absolute bottom-0 end-0">
              {thumbsDownCount}
            </Badge>
          </div>
          <div className="d-flex flex-column position-relative">
            <Button
              variant="link"
              onClick={handleAngryClick}
              className="p-0 reaction-button"
              size="lg"
            >
              <span
                role="img"
                aria-label="angry"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              >
                😠
              </span>
            </Button>
            <Badge
              bg="success"
              className="position-absolute bottom-0 end-0 reaction-badge"
            >
              {angryCount}
            </Badge>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
