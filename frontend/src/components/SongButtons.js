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
function SharePlay({ setFloatingComments, spotify_link, apple_music_link }) {
  const [playModal, setPlayModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [reviewWriteModal, setReviewWriteModal] = useState(false);
  const [reviewReadModal, setReviewReadModal] = useState(false);
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
          onClick={() => setReviewReadModal((reviewModal) => !reviewModal)}
        >
          <FontAwesomeIcon icon={faCommentDots} size="2xl" type="regular" />
        </Button>
        <ReviewReadModal
          show={reviewReadModal}
          onHide={() => setReviewReadModal((reviewModal) => !reviewModal)}
        />
      </Col>
      <Col className="d-flex justify-content-end">
        <Button
          variant="link"
          onClick={() => setReviewWriteModal((reviewModal) => !reviewModal)}
        >
          <FontAwesomeIcon icon={faPen} size="2xl" type="regular" />
        </Button>
        <ReviewWriteModal
          show={reviewWriteModal}
          onHide={() => setReviewWriteModal((reviewModal) => !reviewModal)}
        />
      </Col>
    </>
  );
}

export default SharePlay;
