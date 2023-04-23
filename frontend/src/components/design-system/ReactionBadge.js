import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useRealmApp } from "../../contexts/RealmApp";
import { BSON } from "realm-web";
import { formatCount } from "../../utils/utils";

function ReactionBadge({
  emoji,
  count,
  handleClick,
  image = "",
  staticImage = "",
  ids,
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
  const { currentUser } = useRealmApp();
  const whiteBody = ids?.has(currentUser.id);
  return (
    <motion.div
      className={`mx-2 p-0 rounded-pill w-auto`}
      initial={{ scale: 1 }}
      animate={isAnimating ? { scale: 1.1 } : { scale: 1 }}
      style={{
        backgroundColor: whiteBody ? "#f0d9c2" : "rgba(30,30,30, 0.7)",
        border: `1px solid ${whiteBody ? "#a62607" : "rgba(255,255,255,0.5)"}`,
        boxShadow: whiteBody ? "0.3px 0.3px 3px #a62607" : undefined,
      }}
    >
      <Row className="px-0 mx-0">
        <Col className="d-flex justify-content-end align-items-center p-0 px-1">
          <Button
            size="sm"
            variant="link"
            onClick={handleButtonClick}
            className={`p-0 bg-transparent text-decoration-none text-center ${
              whiteBody ? "text-black" : "text-white"
            }`}
          >
            <div className="d-flex justify-content-center align-items-center">
              <span>{formatCount(count)}</span>
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
            </div>
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
  return (
    <>
      {Object.entries(reactionOrder).map(([emoji, image]) => (
        <ReactionBadge
          key={emoji}
          emoji={emoji}
          image={image}
          staticImage={reactionStaticOrder[emoji]}
          count={reactionCount[emoji]?.count || 0}
          handleClick={() => handleReact(emoji)}
          ids={reactionCount[emoji]?.user_ids}
        />
      ))}
    </>
  );
}
