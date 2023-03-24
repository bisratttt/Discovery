import {
  faCommentDots,
  faPlay,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Image } from "react-bootstrap";
import PlayModal from "./PlayModal";
import ReviewModal from "./ReviewModal";
import ShareModal from "./ShareModal";
// buttons underneath the album (Share, Play, Comments)
function SharePlay({ setFloatingComments, spotify_link, apple_music_link }) {
  const [playModal, setPlayModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
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

      <Col className="d-flex justify-content-end">
        <Button
          style={{ background: "transparent", borderColor: "transparent" }}
          onClick={() =>
            setFloatingComments((floatingComment) => !floatingComment)
          }
        >
          <FontAwesomeIcon icon={faCommentDots} size="2xl" />
        </Button>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button
          variant="link"
          onClick={() => setReviewModal((reviewModal) => !reviewModal)}
        >
          <FontAwesomeIcon
            icon={faCommentDots}
            beat={reviewModal}
            size="2xl"
            type="regular"
          />
        </Button>
        <ReviewModal
          show={reviewModal}
          onHide={() => setReviewModal((reviewModal) => !reviewModal)}
        />
      </Col>
    </>
  );
}

export default SharePlay;
