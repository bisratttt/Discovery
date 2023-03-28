import React, { useEffect } from "react";
import { Modal, Row } from "react-bootstrap";
import { useState } from "react";
// responsive embeding of youtube audio/video files
function YoutubeEmbed({ srcUrl }) {
  return <iframe src={srcUrl} allow="autoplay; encrypted-media"></iframe>;
}
export default function IntroPlaySongModal({ srcUrl }) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowModal(true);
    }, 2870);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <Modal
      onHide={() => setShowModal(false)}
      show={showModal}
      size="xl"
      centered
      animation={false}
      className="intro-song-modal"
      button
      backdrop="static"
      style={{ minWidth: "80vh !important" }}
    >
      <Modal.Header className="bg-black" closeButton closeVariant="white">
        <Modal.Title className="text-white">The song of the day</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-black">
        <Row style={{ minHeight: "80vh" }}>
          <YoutubeEmbed srcUrl={srcUrl} />
        </Row>
      </Modal.Body>
    </Modal>
  );
}
