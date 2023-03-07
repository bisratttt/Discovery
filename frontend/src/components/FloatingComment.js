import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from "react-avatar";
import { useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import chats from "../test.json";

const Comment = ({ chat }) => {
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const avatarSize = isSmallScreen ? 40 : 45;
  return (
    <div className="d-flex flex-row justify-content-start align-items-end">
      <Avatar
        name={chat.username}
        round
        size={avatarSize}
        className="me-2"
        textSizeRatio={2}
      />
      <div>
        <p
          style={{ fontStyle: "oblique 70deg" }}
          className="font-italic d-flex justify-content-start m-0 text-white"
        >
          <small>@{chat.username}</small>
        </p>
        <p
          className="small mb-1 me-1 p-2 rounded-1 text-white"
          style={{
            backgroundColor: "rgba(175, 171, 169, 0.25)",
          }}
        >
          {chat.body}
        </p>
      </div>
      <p className="small m-1 rounded-3 text-white">{chat.time}</p>
    </div>
  );
};

const CommentList = () => {
  const [visibleChats, setVisibleChats] = useState([]);
  const [chatIndex, setChatIndex] = useState(0);

  useEffect(() => {
    if (chatIndex < chats.length) {
      setVisibleChats((prevVisibleChats) => [
        ...prevVisibleChats.slice(1),
        { ...chats[chatIndex], id: uuidv4() },
      ]);
    }
  }, [chatIndex]);

  const handleAnimationComplete = () => {
    setChatIndex((prevChatIndex) => (prevChatIndex + 1) % chats.length);
    console.log(visibleChats);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <AnimatePresence mode="sync" when="exit">
        {visibleChats.map((chat, index) => (
          <motion.div
            key={chat.id}
            transition={{
              delay: index * 0.5,
              duration: 2,
              type: "tween",
              ease: "easeInOut",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -50,
            }}
            onAnimationComplete={handleAnimationComplete}
          >
            <Comment chat={chat} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

function FloatingComment() {
  return (
    <>
      <CommentList />
    </>
  );
}

// FloatingComment.propTypes = {
//   comments: PropTypes.array,
// };
export default FloatingComment;
