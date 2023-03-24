import React from "react";
import { Modal } from "react-bootstrap";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";
import Avatar from "react-avatar";

export default function ReviewReadModal({
  title = "Test Title",
  body = "Test body",
  username = "bisrat",
  time = "0:00 AM",
  onHide,
  show,
}) {
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      className="transparent-modal"
      centered
      animation={false}
    >
      <Modal.Header
        className="text-white"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2rem)",
        }}
      >
        <Row>
          <Col className="text-muted d-flex justify-content-start align-items-center">
            <Avatar
              textSizeRatio={2}
              name={username}
              size="40"
              round
              className="me-3"
            />
            {`reviewed at ${time}`}
          </Col>
        </Row>
        <Col className="d-flex justify-content-end">
          <FontAwesomeIcon
            size="xl"
            icon={faXmark}
            style={{ color: "#ffffff" }}
            onClick={onHide}
          />
        </Col>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2rem)",
        }}
        className="text-white"
      >
        <h1>{title}</h1>
        <p>{body}</p>
      </Modal.Body>
    </Modal>
  );
}
