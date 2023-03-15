import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SongIntroLargeScreen = ({ onAnimationEnd }) => {
  const textSequence = ["The", "Song", "of", "The", "Day", "is"];
  const [zoomText, setZoomText] = useState(false);
  const [removeIntro, setRemoveIntro] = useState(false);

  const wordVariants = {
    hidden: { scale: 0 },
    visible: (index) => ({
      scale: 1,
      transition: { duration: 0.2, delay: index * 0.25 },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    exit: { opacity: 0, scale: 50, transition: { duration: 1 } },
  };

  const zoomInVariant = {
    visible: { opacity: 1 },
    zoomOut: {
      scale: 50,
      opacity: 0,
      transition: {
        scale: { duration: 0.3, ease: "easeOut" },
      },
    },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setZoomText(true);
    }, textSequence.length * 300);

    return () => clearTimeout(timeout);
  }, [textSequence]);

  useEffect(() => {
    if (zoomText) {
      setRemoveIntro(true);
    }
  }, [zoomText]);

  return (
    <AnimatePresence mode="sync">
      {!removeIntro && (
        <motion.div
          key="text-container"
          className="text-container"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <motion.div
            style={{ display: "flex" }}
            initial="visible"
            animate="zoomOut"
            variants={zoomInVariant}
          >
            {textSequence.map((word, index) => (
              <motion.span
                key={index}
                className="text"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
              >
                {word}
                &nbsp;
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SongIntroLargeScreen;
