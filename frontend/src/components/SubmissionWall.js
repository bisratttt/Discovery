import { faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import SongSubmissionModal from "./SongSubmissionModal";
import { useRealmApp } from "../contexts/RealmApp";
import { useToggleComponents } from "../contexts/ToggleComponents";

export default function SubmissionWall({ refetch }) {
  const [songSubmissionModal, setSongSubmissionModal] = useState(false);
  const { currentUser } = useRealmApp();
  const { setOpenLoginModal } = useToggleComponents();
  return (
    <>
      <Container
        id="song-submission-wall"
        className="position-absolute rounded-3 h-100 d-flex flex-column justify-content-center text-white"
      >
        <Row>
          <Col className="px-0">
            <h4>Find others and expand your musical horizon!</h4>
          </Col>
        </Row>
        <Row>
          <Col className="px-0">
            <p style={{ color: "gray" }}>
              Share your <em>Song of the day</em> and explore what others are
              listening to
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              size="lg"
              className={`rounded-3 bg-black border-white`}
              onClick={() => {
                if (currentUser.providerType === "local-userpass") {
                  setSongSubmissionModal((submissionModal) => !submissionModal);
                } else {
                  setOpenLoginModal(true);
                }
              }}
            >
              <FontAwesomeIcon icon={faPenFancy} className="pe-2" />
              Add your song of the day
            </Button>
          </Col>
        </Row>
      </Container>
      <SongSubmissionModal
        refetch={refetch}
        show={songSubmissionModal}
        onHide={() =>
          setSongSubmissionModal((submissionModal) => !submissionModal)
        }
      />
    </>
  );
}
