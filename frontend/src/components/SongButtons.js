import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faCommentDots, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, ButtonGroup, Col, Image } from "react-bootstrap";
import PlayModal from "./PlayModal";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useToggleComponents } from "../contexts/ToggleComponents";

// buttons underneath the album (Share, Play, Comments)
function SongButtons({ setOpenReact, spotify_link, apple_music_link }) {
  const [playModal, setPlayModal] = useState(false);
  const { setOpenReview, setOpenSongSubmissionList } = useToggleComponents();
  return (
    <>
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
      </Col>
      <Col className="d-flex justify-content-end">
        <ButtonGroup>
          <Button
            className="d-flex align-items-center justify-content-center text-decoration-none border-0 py-1 px-1"
            style={{ background: "transparent", borderColor: "transparent" }}
            onClick={() => setOpenReact((react) => !react)}
          >
            <FontAwesomeIcon size="2xl" icon={faSmile} className="me-1" />
          </Button>
          <Button
            className="ps-1"
            style={{ background: "transparent", borderColor: "transparent" }}
            onClick={() => {
              setOpenSongSubmissionList(false);
              setOpenReview((openReview) => !openReview);
            }}
          >
            <RateReviewIcon sx={{ fontSize: 40 }} />
          </Button>
        </ButtonGroup>
      </Col>
      <PlayModal
        show={playModal}
        onHide={() => setPlayModal(false)}
        spotify_link={spotify_link}
        apple_music_link={apple_music_link}
      />
    </>
  );
}

export default SongButtons;
