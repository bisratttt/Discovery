import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

const ReactionButton = ({ emoji, count, handleClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonClick = () => {
    setIsAnimating(true);
    handleClick();
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  return (
    <motion.div
      className="d-flex flex-column position-relative"
      initial={{ scale: 1 }}
      animate={isAnimating ? { scale: 1.1 } : { scale: 1 }}
    >
      <Button
        variant="link"
        onClick={handleButtonClick}
        className="p-0 reaction-button"
      >
        <span
          role="img"
          aria-label={emoji}
          style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)" }}
        >
          {emoji}
        </span>
      </Button>
      <div className="position-absolute bottom-0 end-0 reaction-badge">
        {count}
      </div>
    </motion.div>
  );
};

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
  const isSmallScreen = useMediaQuery("(max-width:850px)");

  return (
    <Card bg="dark" text="white" id="reaction-card" className="mb-2">
      <Row>
        <Col
          xs={12}
          className="d-flex align-items-center justify-content-around"
        >
          <ReactionButton
            emoji="❤️"
            count={heartCount}
            handleClick={handleHeartClick}
          />
          <ReactionButton
            emoji="🔥"
            count={fireCount}
            handleClick={handleFireClick}
          />
          <ReactionButton
            emoji="👍"
            count={thumbsUpCount}
            handleClick={handleThumbsUpClick}
          />
          <ReactionButton
            emoji="👎"
            count={thumbsDownCount}
            handleClick={handleThumbsDownClick}
          />
          <ReactionButton
            emoji="😠"
            count={angryCount}
            handleClick={handleAngryClick}
          />
        </Col>
      </Row>
    </Card>
  );
}
