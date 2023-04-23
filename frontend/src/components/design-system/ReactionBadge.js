import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useRealmApp } from "../../contexts/RealmApp";
import { BSON } from "realm-web";

function ReactionBadge({
  emoji,
  count,
  handleClick,
  image = "",
  staticImage = "",
  whiteBody = false,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const handleButtonClick = () => {
    setIsAnimating(true);
    handleClick();
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };
  const isPhoneScreen = useMediaQuery("(max-width:630px");
  return (
    <motion.div
      className={`mx-2 p-0 rounded-pill w-auto ${whiteBody && "text-white"}`}
      initial={{ scale: 1 }}
      animate={isAnimating ? { scale: 1.1 } : { scale: 1 }}
      style={{
        backgroundColor: whiteBody ? "white" : "rgba(30,30,30, 0.7)",
        border: "1px solid rgba(255,255,255,0.5)",
      }}
    >
      <Row className="px-0 mx-0">
        <Col
          xs={4}
          className={`d-flex justify-content-start align-items-center p-0 ps-2`}
        >
          <span>{count}</span>
        </Col>
        <Col className="d-flex justify-content-end align-items-center p-0">
          <Button
            size="sm"
            variant="link"
            onClick={handleButtonClick}
            className="p-0 bg-transparent"
          >
            {image !== "" ? (
              <Image
                height={22}
                width="auto"
                src={!isHover ? staticImage : image}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              />
            ) : (
              <span role="img" aria-label={emoji}>
                {emoji}
              </span>
            )}
          </Button>
        </Col>
      </Row>
    </motion.div>
  );
}

export default function ReactionList({ handleReact, reactionCount }) {
  const reactionOrder = {
    "❤️": "../emojis/heart.webp",
    "🔥": "../emojis/fire.webp",
    "👍": "../emojis/thumbs_up.webp",
    "👎": "../emojis/thumbs_down.webp",
  };
  const reactionStaticOrder = {
    "❤️": "../emojis/static/heart.avif",
    "🔥": "../emojis/static/fire.avif",
    "👍": "../emojis/static/thumbs_up.avif",
    "👎": "../emojis/static/thumbs_down.avif",
  };
  const { currentUser } = useRealmApp();
  return (
    <Row className="p-0 m-0">
      <Col xs={12} className="d-flex align-items-center justify-content-around">
        {Object.entries(reactionOrder).map(([emoji, image]) => (
          <ReactionBadge
            key={emoji}
            emoji={emoji}
            image={image}
            staticImage={reactionStaticOrder[emoji]}
            count={reactionCount[emoji]?.count || 0}
            handleClick={() => handleReact(emoji)}
            whiteBody={reactionCount[emoji]?.user_ids?.has(
              new BSON.ObjectId(currentUser.id)
            )}
          />
        ))}
      </Col>
    </Row>
  );
}
