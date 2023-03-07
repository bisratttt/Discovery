import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function ShareModal(props) {
  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex justify-content-center w-100">
          Share
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "rgba(255,255,255,0.6)" }}>
        <Row className="justify-content-between">
          <Col className="d-flex justify-content-center mt-2 mb-2">
            <a href={props.shareLink} style={{ color: "black" }}>
              <FontAwesomeIcon icon={faCopy} size="2xl" />
            </a>
          </Col>
          <Col className="d-flex justify-content-center mt-2 mb-2">
            <a href={props.shareLink} style={{ color: "red" }}>
              <FontAwesomeIcon icon={faInstagram} size="2xl" />
            </a>
          </Col>
          <Col className="d-flex justify-content-center mt-2 mb-2">
            <a href={props.shareLink} style={{ color: "blue" }}>
              <FontAwesomeIcon icon={faTwitter} size="2xl" />
            </a>
          </Col>
          <Col className="d-flex justify-content-center mt-2 mb-2">
            <a href={props.shareLink}>
              <FontAwesomeIcon icon={faFacebook} size="2xl" />
            </a>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

ShareModal.propTypes = {
  shareLink: PropTypes.string,
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default ShareModal;
