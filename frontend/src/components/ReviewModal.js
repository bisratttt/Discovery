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
    >
      <Modal.Header
        className="text-white"
        style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      >
        <Modal.Title className="text-white">Review this song</Modal.Title>
        <FontAwesomeIcon
          size="xl"
          icon={faXmark}
          style={{ color: "#ffffff" }}
          onClick={props.onHide}
        />
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
        <ReviewEditor />
      </Modal.Body>
    </Modal>
  );
}
