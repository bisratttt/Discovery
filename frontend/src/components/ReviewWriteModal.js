import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal } from "react-bootstrap";
import ReviewEditor from "./ReviewEditor";

export default function ReviewModal(props) {
  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
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
        <Modal.Title className="text-white">Review this song</Modal.Title>
        <FontAwesomeIcon
          size="xl"
          icon={faXmark}
          style={{ color: "#ffffff" }}
          onClick={props.onHide}
        />
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2rem)",
        }}
      >
        <ReviewEditor />
      </Modal.Body>
    </Modal>
  );
}
