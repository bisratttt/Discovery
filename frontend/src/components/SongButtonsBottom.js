import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import PlayModal from "./PlayModal";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useToggleComponents } from "../contexts/ToggleComponents";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ReactionBanner from "./ReactionBanner";

// buttons underneath the album (Share, Play, Comments)
function SongButtons({ spotify_link, apple_music_link }) {
  const [playModal, setPlayModal] = useState(false);
  const { setOpenReview, setOpenSongSubmissionList, setOpenSongInfo } =
    useToggleComponents();

  const renderReactionTooltip = (props) => (
    <Popover
      id="reaction-popover"
      {...props}
      className="py-0"
      bsPrefix="popover popover-container"
    >
      <Popover.Body>
        <ReactionBanner />
      </Popover.Body>
    </Popover>
  );
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
          <LibraryMusicIcon sx={{ fontSize: 40 }} />
        </Button>
      </Col>
      <Col className="d-flex justify-content-end">
        <ButtonGroup>
          <OverlayTrigger
            trigger="click"
            placement="top"
            delay={{ show: 250, hide: 0 }}
            overlay={renderReactionTooltip}
            rootClose={true}
          >
            <Button
              className="d-flex align-items-center justify-content-center text-decoration-none border-0 py-1 px-1"
              style={{ background: "transparent", borderColor: "transparent" }}
            >
              <FontAwesomeIcon size="2xl" icon={faSmile} className="me-1" />
            </Button>
          </OverlayTrigger>

          <Button
            className="ps-1"
            style={{ background: "transparent", borderColor: "transparent" }}
            onClick={() => {
              setOpenSongInfo(false);
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
