import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useRealmApp } from "../contexts/RealmApp";

export default function DeleteAccountWarningModal({ onHide, show }) {
  const { deleteUser } = useRealmApp();
  return (
    <Modal
      onHide={onHide}
      show={show}
      centered
      animation={false}
      className="px-2 transparent-modal text-white"
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(2rem)",
          WebkitBackdropFilter: "blur(2rem)",
        }}
      >
        <Modal.Title>Delete your account</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(2rem)",
          WebkitBackdropFilter: "blur(2rem)",
        }}
        className=" rounded-bottom"
      >
        <Row>
          <Col className="d-flex justify-content-center">
            <h5> Are you sure you want to delete your account?</h5>
          </Col>
        </Row>
        <Row>
          <Col
            className="d-flex justify-content-center"
            xs={6}
            onClick={() => onHide()}
          >
            <Button variant="success" className="border-0  px-5" type="text">
              <span>No</span>
            </Button>
          </Col>
          <Col
            className="d-flex justify-content-center"
            xs={6}
            onClick={async () => {
              await deleteUser();
              onHide();
            }}
          >
            <Button variant="danger" className="border-0  px-5" type="text">
              <span>Yes</span>
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
