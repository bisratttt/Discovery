import { faHeart, faSmile } from "@fortawesome/free-regular-svg-icons";
import {
  faCommentDots,
  faPen,
  faPlay,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Image } from "react-bootstrap";
import PlayModal from "./PlayModal";
import ReviewReadModal from "./ReviewReadModal";
import ReviewWriteModal from "./ReviewWriteModal";
import ShareModal from "./ShareModal";
// buttons underneath the album (Share, Play, Comments)
function SharePlay({
  setOpenChat,
  setOpenReact,
  spotify_link,
  apple_music_link,
}) {
  const [playModal, setPlayModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  return (
    <>
      <Col className="d-flex justify-content-start">
        <Button
          style={{
            background: "transparent",
            borderColor: "transparent",
          }}
          onClick={() => setShareModal(true)}
        >
          <FontAwesomeIcon icon={faShareNodes} size="2xl" />
        </Button>
        <ShareModal
          show={shareModal}
          onHide={() => setShareModal(false)}
          shareLink="#!"
        />
      </Col>
      <Col className="d-flex justify-content-center">
        <Button
          onClick={() => setPlayModal(true)}
          style={{
            background: "transparent",
            borderColor: "transparent",
          }}
        >
          <FontAwesomeIcon icon={faPlay} size="2xl" />
        </Button>
        <PlayModal
          show={playModal}
          onHide={() => setPlayModal(false)}
          spotify_link={spotify_link}
          apple_music_link={apple_music_link}
        />
      </Col>
      <Col>
        <Button
          className="d-flex align-items-center justify-content-center text-decoration-none border-0 py-1"
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          onClick={() => setOpenReact((react) => !react)}
        >
          <FontAwesomeIcon size="2xl" icon={faSmile} className="me-1" />
          <h2 className="mb-0">+</h2>
        </Button>
      </Col>
      <Col>
        <Button
          style={{ background: "transparent", borderColor: "transparent" }}
          onClick={() => setOpenChat((openChat) => !openChat)}
        >
          <FontAwesomeIcon icon={faCommentDots} size="2xl" />
        </Button>
      </Col>
    </>
  );
}

export default SharePlay;
