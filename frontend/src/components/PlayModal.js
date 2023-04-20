import { Col, Modal, Row } from "react-bootstrap";

function AppleMusic({ srcUrl }) {
  const url = new URL(srcUrl);
  const params = new URLSearchParams(url.search);
  const iValue = params.get("i");
  return (
    <iframe
      allow="autoplay *; encrypted-media *;"
      frameborder="0"
      height="152"
      style={{
        width: "100%",
        maxWidth: "660px",
        overflow: "hidden",
        background: "transparent",
      }}
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
      src={`https://embed.music.apple.com${url.pathname}?i=${iValue}`}
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
      height="240"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
function PlayModal(props) {
  return (
    <Modal {...props} centered className="transparent-modal" animation={false}>
      <Modal.Header
        closeButton
        closeVariant="white"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2rem)",
          WebkitBackdropFilter: "blur(2rem)",
        }}
      >
        <Modal.Title className="text-center text-white">Play on</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2rem)",
          WebkitBackdropFilter: "blur(2rem)",
        }}
      >
        <Row>
          <Col xs={12}>
            <Spotify
              srcUrl={
                props?.spotify_link ??
                "https://open.spotify.com/track/2rdzxFb0MGJeZXO0ymVDD7"
              }
            />
          </Col>
          <Col xs={12} className="rounded-3">
            <AppleMusic
              srcUrl={
                props?.apple_music_link ??
                "https://music.apple.com/us/album/error-404/1448151448?i=1448151450"
              }
            />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default PlayModal;
