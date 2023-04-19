import { Container, Row, Spinner } from "react-bootstrap";
import albumArt from "album-art";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import SongButtonsBottom from "./SongButtonsBottom";
import { useQuery } from "@apollo/client";
import { QUERY_SONG } from "../queries/SongQuery";
import SongIntroLargeScreen from "./SongIntroLargeScreen";
import { AnimatePresence, motion } from "framer-motion";
import CommentCard from "./CommentCard";
import ShareModal from "./ShareModal";
import { useToggleComponents } from "../contexts/ToggleComponents";
import SongSubmissionList from "./SongSubmissionList";
import SongButtonsTop from "./SongButtonsTop";
import NavBar from "./NavBar";
import FeedbackPopup from "./FeedbackPopup";
import ProfileCard from "./ProfileCard";
import ArtistSongInfo from "./ArtistSongInfo";
import NavBarBottom from "./NavBarBottom";
import SongPageSmall from "./SongPageSmall";

// import IntroPlaySongModal from "./IntroPlaySongModal";
// create a loading screen if the song hasn't fetched yet
export default function Page() {
  const { loading, error, data } = useQuery(QUERY_SONG);
  const isSmallScreen = useMediaQuery("(max-width:850px)");

  return (
    <Container
      style={{
        position: "relative",
        overflow: "hidden",
        margin: 0,
        backgroundColor: "transparent",
        minHeight: "100vh",
      }}
      fluid
    >
      {loading ? (
        <Row
          style={{ minHeight: "100vh" }}
          className="justify-content-center align-items-center"
        >
          <Spinner animation="border" variant="dark" />
        </Row>
      ) : isSmallScreen ? (
        <SongPageSmall data={data} />
      ) : (
        <SongPage data={data} />
      )}
    </Container>
  );
}
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

const isFirstVisitToday = () => {
  const today = new Date().toISOString().slice(0, 10);
  const lastVisit = localStorage.getItem("lastVisit");
  if (!lastVisit || lastVisit !== today) {
    localStorage.setItem("lastVisit", today);
    return true;
  }

  return false;
};

function SongPage({ data }) {
  const [albumImg, setAlbumImg] = useState("");
  const {
    openReview,
    openSongSubmissionList,
    openSongInfo,
    setOpenSongInfo,
    openProfile,
    setOnlyOneStateTrue,
  } = useToggleComponents();
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const isPhoneScreen = useMediaQuery("(max-width:630px)");
  const isBigScreen = useMediaQuery("(min-width:850px)");
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const [aspectRatio, setAspectRatio] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [songHover, setSongHover] = useState(false);
  const [artistHover, setArtistHover] = useState(false);
  const [firstVisitToday, setFirstVisitToday] = useState(false);

  useEffect(() => {
    setFirstVisitToday(isFirstVisitToday());
  });

  const cardStyle = {
    backgroundColor: "rgba(0,0,0,0.7)",
    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.8)", // add a box shadow to create an elevated effect
    backdropFilter: "blur(2rem)", // blurs the background when translucent
    WebkitBackdropFilter: "blur(2rem)",
  };

  useEffect(() => {
    const updateAspectRatio = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    };

    window.addEventListener("resize", updateAspectRatio);
    updateAspectRatio(); // Call the function initially to set the initial aspect ratio

    return () => {
      window.removeEventListener("resize", updateAspectRatio);
    };
  }, []);
  // change the height to full screen if the elements aren't fullscreen
  useEffect(() => {
    albumArt(data.song.artist ?? "", {
      album: data.song.album_name ?? "",
      size: "large",
    }).then((album) => setAlbumImg(album));
  }, []);
  // sets the image size of the album art for specific screen/width
  return (
    <>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${albumImg})` }}
      />
      <div className="background-darker" />
      <SongIntroLargeScreen />
      <NavBar />
      <div className="relative-container">
        <Row
          className="justify-content-evenly align-items-center mx-0"
          style={{
            minHeight: "87vh",
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {openSongInfo.openInfo && (
              <motion.div
                key="info-card"
                className={`col-xs-12 col-sm-9 ${
                  isBigScreen && "col-md-6"
                } col-lg-5 d-flex flex-column justify-content-center song-card ${
                  !isPhoneScreen && "rounded-3"
                }`}
                style={{
                  ...cardStyle,
                  height: "85vh",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3 }} // Animation duration (optional)
              >
                <ArtistSongInfo active_tab={openSongInfo.active_tab} />
              </motion.div>
            )}
            <motion.div
              key="song-card"
              layout="position"
              className={`col-xs-12 col-sm-9 ${
                isBigScreen && "col-md-5"
              } col-lg-4 d-flex flex-column justify-content-center song-card px-0 ${
                !isPhoneScreen && "rounded-3"
              }
                ${
                  // hides song for smaller screen sizes
                  isSmallScreen &&
                  (openReview ||
                    openSongSubmissionList ||
                    openSongInfo.openInfo ||
                    openProfile) &&
                  "hide-song"
                }`}
              style={{
                ...cardStyle,
                minHeight: isSmallScreen ? "60vh" : "85vh",
              }}
            >
              <Row className="justify-content-between">
                <SongButtonsTop setShareModal={setShareModal} />
              </Row>
              <Row
                className="justify-content-center"
                style={{ minHeight: "60vh" }}
                // style={{ minHeight: "60vh" }}
              >
                {/* <Image
                  src={albumImg}
                  className={`mb-2`}
                  style={{ maxWidth: "95%" }}
                  fluid
                /> */}
                <YoutubeEmbed srcId={data.song.youtube_id} />
              </Row>
              <Row>
                <p
                  onClick={() => {
                    setOpenSongInfo({ openInfo: false, active_tab: "Song" });
                    setOnlyOneStateTrue(setOpenSongInfo);
                  }}
                  className={`${
                    songHover && "text-decoration-underline"
                  } song-title`}
                  onMouseEnter={() => setSongHover(true)}
                  onMouseLeave={() => setSongHover(false)}
                  style={{ cursor: "pointer" }}
                >
                  {data.song.song_name ?? ""}
                </p>
              </Row>
              <Row>
                <p
                  onMouseEnter={() => setArtistHover(true)}
                  onMouseLeave={() => setArtistHover(false)}
                  onClick={() => {
                    setOpenSongInfo({ openInfo: false, active_tab: "Artist" });
                    setOnlyOneStateTrue(setOpenSongInfo);
                  }}
                  className={`${
                    artistHover && "text-decoration-underline"
                  } artist-name`}
                  style={{ cursor: "pointer" }}
                >
                  {data.song.artist ?? ""}
                </p>
              </Row>
              <Row className="mt-1">
                <SongButtonsBottom
                  spotify_link={data?.song?.spotify_link}
                  apple_music_link={data?.song?.apple_music_link}
                  song_id={data?.song._id}
                />
              </Row>
            </motion.div>
            {openReview && (
              <motion.div
                key="comment-card"
                style={{
                  ...cardStyle,
                  minHeight: "85vh",
                }}
                className={`col-xs-12 ${isBigScreen && "col-md-6"} col-lg-7 ${
                  !isPhoneScreen && "rounded-3"
                } p-0`}
                initial={{ x: "100%" }} // Start from the left side, out of the viewport
                animate={{ x: "0%" }} // Move to the original position
                exit={{ x: "100%" }} // Exit to the left side when removed from the DOM
                transition={{ duration: 0.3 }} // Animation duration (optional)
              >
                {/* Your new column content */}
                <CommentCard songId={data.song._id} />
              </motion.div>
            )}
            {openSongSubmissionList && (
              <motion.div
                key="submission-card"
                style={{
                  ...cardStyle,
                  minHeight: "85vh",
                }}
                className={`col-xs-12 ${isBigScreen && "col-md-6"} col-lg-5 ${
                  !isPhoneScreen && "rounded-3"
                } p-0`}
                initial={{ x: "100%" }} // Start from the left side, out of the viewport
                animate={{ x: "0%" }} // Move to the original position
                exit={{ x: "100%" }} // Exit to the left side when removed from the DOM
                transition={{ duration: 0.3 }} // Animation duration (optional)
              >
                {/* Your new column content */}
                <SongSubmissionList />
              </motion.div>
            )}
            {openProfile && (
              <motion.div
                key="profile-card"
                style={{
                  ...cardStyle,
                  minHeight: "85vh",
                  position: !isSmallScreen ? "absolute" : "relative",
                  left: !isSmallScreen ? "75.5%" : "0%",
                }}
                className={`col-xs-12 ${isBigScreen && "col-md-5"} col-lg-3 ${
                  !isPhoneScreen && "rounded-3"
                } p-0`}
                initial={{ x: "100%" }} // Start from the left side, out of the viewport
                animate={{ x: "0%" }} // Move to the original position
                exit={{ x: "100%" }} // Exit to the left side when removed from the DOM
                transition={{ duration: 0.2 }} // Animation duration (optional)
              >
                {/* Your new column content */}
                <ProfileCard />
              </motion.div>
            )}
          </AnimatePresence>
        </Row>
      </div>
      <NavBarBottom />
      <ShareModal
        show={shareModal}
        onHide={() => setShareModal(false)}
        shareLink="#!"
      />
      {!isSmallScreen && <FeedbackPopup songId={data.song._id} />}
    </>
  );
}
