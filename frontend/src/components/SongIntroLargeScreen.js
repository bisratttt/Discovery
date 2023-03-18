import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SongInfoLargeScreen = ({ setShowNav }) => {
  const textSequence = ["The", "Song", "of", "The", "Day", "is"];
  const [showText, setShowText] = useState(true);
  const [showComponent, setShowComponent] = useState(true);
  const wordVariants = {
    hidden: { scale: 0 },
    visible: (index) => ({
      scale: 1,
      transition: { duration: 0.1, delay: (index + 2) * 0.25 },
    }),
  };

  const zoomInVaraints = {
    hidden: { opacity: 1, scale: 1 },
    zoomOut: { opacity: 0, scale: 70, transition: { duration: 1 } },
  };

  const containerVaraints = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0 },
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(false);
    }, textSequence.length * 450);

    return () => clearTimeout(timeout);
  }, [textSequence]);
  useEffect(() => {
    if (!showText) {
      setShowComponent(false);
    }
  }, [showText]);
  return (
    <AnimatePresence>
      {showComponent && (
        <motion.div
          initial="visible"
          exit="hidden"
          onAnimationComplete={() => setShowNav(true)}
          variants={containerVaraints}
          className="animation-container"
          style={{ zIndex: 999 }}
        >
          <AnimatePresence>
            {showText && (
              <motion.div
                style={{ display: "flex" }}
                initial="hidden"
                exit="zoomOut"
                variants={zoomInVaraints}
                className="word-container"
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
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SongInfoLargeScreen;
