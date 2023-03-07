import { Col, Modal, Row } from "react-bootstrap";

function AppleMusic({ srcUrl }) {
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
      src={`https://embed.${srcUrl}`}
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
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Play on</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "rgba(255,255,255,0.6)" }}>
        <Row>
          <Col xs={12} sm={6}>
            <Spotify srcUrl="https://open.spotify.com/track/4OmfWzukSVD140NiAIEjem?si=e65b2dac2cbc4c9d" />
          </Col>
          <Col xs={12} sm={6}>
            <AppleMusic srcUrl="music.apple.com/us/album/static/1631909576?i=1631909578" />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default PlayModal;
