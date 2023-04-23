import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  OverlayTrigger,
  Button,
  Popover,
} from "react-bootstrap";
import albumArt from "album-art";
import SongInfoLargeScreen from "./SongIntroLargeScreen";
import { useToggleComponents } from "../contexts/ToggleComponents";
import ArtistSongInfo from "./ArtistSongInfo";
import SongButtonsTop from "./SongButtonsTop";
import ShareModal from "./ShareModal";
import CommentCard from "./CommentCard";
import SongSubmissionList from "./SongSubmissionList";
import ProfileCard from "./ProfileCard";
import NavBarBottom from "./NavBarBottom";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayModal from "./PlayModal";
import ReactionBanner from "./ReactionBanner";
// responsive embeding of youtube audio/video files
function YoutubeEmbed({ srcId }) {
  const url = `https://www.youtube.com/embed/${srcId}`;
  return (
    <iframe
      src={url}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}
const cardStyle = {
  minHeight: "90dvh",
  backgroundColor: "rgba(20,20,20)",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.4)", // add a box shadow to create an elevated effect
  backdropFilter: "blur(2rem)", // blurs the background when translucent
  WebkitBackdropFilter: "blur(2rem)",
};
export default function SongPageSmall({ data }) {
  const [albumImg, setAlbumImg] = useState("");
  const [shareModal, setShareModal] = useState(false);
  const [playModal, setPlayModal] = useState(false);

  const {
    openReview,
    openSongSubmissionList,
    openSongInfo,
    setOpenSongInfo,
    openProfile,
    setOnlyOneStateTrue,
    openLoginModal,
  } = useToggleComponents();
  useEffect(() => {
    albumArt(data?.song?.artist ?? "", {
      album: data?.song?.album_name ?? "",
      size: "large",
    }).then((album) => setAlbumImg(album));
  }, []);
  const renderReactionTooltip = (props) => (
    <Popover
      id="reaction-popover"
      {...props}
      className="py-0 "
      bsPrefix="popover darker-container"
      show={props.show && !openLoginModal}
    >
      <Popover.Body>
        <ReactionBanner songId={data?.song?.id} />
      </Popover.Body>
    </Popover>
  );
  return (
    <Container style={{ zIndex: "1", height: "100dvh" }} fluid className="px-0">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${albumImg})` }}
      />
      <div className="background-darker" />
      <SongInfoLargeScreen />
      {openSongSubmissionList && (
        <div style={{ ...cardStyle }}>
          <SongSubmissionList />
        </div>
      )}
      {openSongInfo.openInfo && (
        <div style={{ ...cardStyle }}>
          <ArtistSongInfo active_tab={openSongInfo.active_tab} />
        </div>
      )}
      {!openReview &&
        !openSongInfo.openInfo &&
        !openSongSubmissionList &&
        !openProfile && (
          <div
            style={{ height: "90dvh" }}
            className="w-100 d-flex flex-column justify-content-center align-items-center mx-0 px-3"
          >
            <div
              className="w-100 rounded-3"
              style={{ ...cardStyle, minHeight: undefined }}
            >
              <Row>
                <SongButtonsTop setShareModal={setShareModal} />
              </Row>
              <Row style={{ minHeight: "60dvh" }}>
                <YoutubeEmbed srcId={data?.song?.youtube_id} />
              </Row>
              <Row>
                <Col
                  xs={2}
                  className="d-flex justify-content-center align-items-center ps-4"
                >
                  <Button
                    onClick={() => setPlayModal(true)}
                    className="border-0 bg-transparent px-0"
                  >
                    <LibraryMusicIcon sx={{ fontSize: 35 }} />
                  </Button>
                </Col>
                <Col xs={8}>
                  <Row>
                    <a
                      onClick={() => {
                        setOpenSongInfo({
                          openInfo: false,
                          active_tab: "Song",
                        });
                        setOnlyOneStateTrue(setOpenSongInfo);
                      }}
                      className="text-decoration-none text-white song-title"
                    >
                      {data?.song?.song_name ?? ""}
                    </a>
                  </Row>
                  <Row>
                    <p
                      onClick={() => {
                        setOpenSongInfo({
                          openInfo: false,
                          active_tab: "Artist",
                        });
                        setOnlyOneStateTrue(setOpenSongInfo);
                      }}
                      className="text-decoration-none text-muted artist-name"
                    >
                      {data?.song?.artist ?? ""}
                    </p>
                  </Row>
                </Col>
                <Col
                  xs={2}
                  className="d-flex justify-content-center align-items-center pe-4"
                >
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    delay={{ show: 250, hide: 0 }}
                    overlay={renderReactionTooltip}
                    rootClose={true}
                  >
                    <Button className="border-0 bg-transparent px-0">
                      <FavoriteBorderOutlinedIcon sx={{ fontSize: 35 }} />
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Row>
            </div>
          </div>
        )}
      {openReview && (
        <div style={{ ...cardStyle }}>
          <CommentCard songId={data?.song?._id} />
        </div>
      )}
      {openProfile && (
        <div style={{ ...cardStyle }}>
          <ProfileCard />
        </div>
      )}
      <NavBarBottom />
      <ShareModal
        show={shareModal}
        onHide={() => setShareModal(false)}
        shareLink="#!"
      />
      <PlayModal
        show={playModal}
        onHide={() => setPlayModal(false)}
        spotify_link={data?.song?.spotify_link}
        apple_music_link={data?.song?.apple_music_link}
      />
    </Container>
  );
}
