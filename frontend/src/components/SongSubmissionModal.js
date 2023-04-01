import React from "react";
import { Modal } from "react-bootstrap";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";
import Avatar from "react-avatar";
import SongSubmissionEditor from "./SongSubmissionEditor"
import { ModalClassKey } from "@mui/material";

export default function SongSubmissionModal(props) {
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
            WebkitBackdropFilter: "blur(2rem)",
          }}>
            <Modal.Title className="text-white">What's your Song of the Day?</Modal.Title>
            
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(2rem)",
            WebkitBackdropFilter: "blur(2rem)",
          }}
          >
            <SongSubmissionEditor onHide={props.onHide} songId={props.songId} />
          </Modal.Body>
        </Modal>
    );
}