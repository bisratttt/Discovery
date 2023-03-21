import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { Col } from "react-bootstrap";
export default function LogoAnimation() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const controls = useAnimation();

  const vinylLogo = "/Logo.png";
  const text = "Disc.";

  const handleAnimation = async () => {
    await controls.start({ x: "100%", transition: { duration: 0 } });
    await controls.start({ x: "0%", transition: { duration: 2 } });
    setAnimationComplete(true);
  };

  return (
    <Col
      sm={12}
      md={6}
      className="d-flex align-items-center justify-content-end"
      style={{ overflow: "hidden" }}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={controls}
        onAnimationComplete={handleAnimation}
      >
        <motion.img
          src={vinylLogo}
          alt="Vinyl Logo"
          style={{ maxHeight: "200px" }}
        />
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: animationComplete ? 1 : 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </Col>
  );
}
