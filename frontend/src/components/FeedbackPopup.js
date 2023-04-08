import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { ADD_FEEDBACK } from "../queries/FeedbackQuery";
import { BSON } from "realm-web";

export default function FeedbackPopup({ songId }) {
  const [visible, setVisible] = useState(false);
  const [body, setBody] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000 * 60 * 3); // Show the prompt after 3 minutes

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  };

  const [addFeedback, { loading, error }] = useMutation(ADD_FEEDBACK);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            zIndex: 1000,
          }}
        >
          <Container
            fluid
            className="rounded-3"
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(2rem)",
              WebkitBackdropFilter: "blur(2rem)",
              padding: "1rem",
              minWidth: "400px",
            }}
          >
            <Row>
              <Col className="d-flex justify-content-start align-items-start">
                <h5 style={{ color: "white" }}>Any feedback?</h5>
              </Col>
              <Col xs="auto">
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={handleClose}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{
                      backgroundColor: "rgba(0,0,0,0.7)",
                      color: "white",
                      borderRadius: "0.375rem",
                    }}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end">
                <Button
                  disabled={loading}
                  variant="primary"
                  className="border-0 mt-2"
                  style={{ backgroundColor: "rgb(166, 39, 7)" }}
                  onClick={() => {
                    addFeedback({
                      variables: {
                        body: body,
                        song_id: new BSON.ObjectId(songId),
                      },
                      onCompleted: () => {
                        setBody("");
                        handleClose();
                      },
                    });
                  }}
                >
                  {loading && (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin={loading}
                      className="pe-2"
                    />
                  )}
                  Submit
                </Button>
              </Col>
            </Row>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
