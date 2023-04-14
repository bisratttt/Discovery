import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
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
import { useFetchData } from "../contexts/FetchData";
import { realmFetch } from "../utils/realmDB";
import { useRealmApp } from "../contexts/RealmApp";

// buttons underneath the album (Share, Play, Comments)
function SongButtons({ spotify_link, apple_music_link, song_id }) {
  const [playModal, setPlayModal] = useState(false);
  const {
    setOpenReview,
    setOpenSongSubmissionList,
    openLoginModal,
    setOpenLoginModal,
    setOpenSongInfo,
    setOpenProfile,
  } = useToggleComponents();
  // fetches the data for the reactions
  const { setReactionCounts } = useFetchData();
  const { currentUser } = useRealmApp();
  useEffect(() => {
    realmFetch({ currentUser, songId: song_id, setReactionCounts });
  }, [currentUser, song_id]);
  const renderReactionTooltip = (props) => (
    <Popover
      id="reaction-popover"
      {...props}
      className="py-0 "
      bsPrefix="popover darker-container"
      show={props.show && !openLoginModal}
    >
      <Popover.Body>
        <ReactionBanner songId={song_id} />
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
              setOpenSongInfo({ openInfo: false });
              setOpenSongSubmissionList(false);
              setOpenProfile(false);
              setOpenLoginModal(false);
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
