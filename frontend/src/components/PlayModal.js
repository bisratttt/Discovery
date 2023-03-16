import { Col, Modal, Row } from "react-bootstrap";

function AppleMusic({ srcUrl }) {
  const url = new URL(srcUrl);
  return (
    <iframe
      allow="autoplay *; encrypted-media *;"
      frameborder="0"
      height="250"
      style={{
        width: "100%",
        maxWidth: "660px",
        overflow: "hidden",
        background: "transparent",
      }}
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
      src={`https://embed.music.apple.com${url.pathname}`}
    />
  );
}
function Spotify({ srcUrl }) {
  const url = new URL(srcUrl);
  return (
    <iframe
      style={{ borderRadius: "12px" }}
      src={`https://open.spotify.com/embed${url.pathname}`}
      width="100%"
      height="252"
      frameBorder="0"
      allowFullScreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
function PlayModal(props) {
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Play on</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "rgba(255,255,255,0.6)" }}>
        <Row>
          <Col xs={12} sm={6}>
            <Spotify srcUrl={props.spotify_link} />
          </Col>
          <Col xs={12} sm={6}>
            <AppleMusic srcUrl={props.apple_music_link} />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default PlayModal;
