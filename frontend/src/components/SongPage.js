import { Container, Col, Row, Image, Spinner } from "react-bootstrap";
import Chat from "./Chat";
import albumArt from "album-art";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import SharePlay from "./SongButtons";
import FloatingComment from "./FloatingComment";
import { useQuery } from "@apollo/client";
import { QUERY_SONG } from "../queries/SongQuery";
import SongIntroLargeScreen from "./SongIntroLargeScreen";
import { AnimatePresence, motion } from "framer-motion";
import ReactionBanner from "./ReactionBanner";
import CommentCardB from "./CommentCardB";
// create a loading screen if the song hasn't fetched yet
export default function SongPageFetch({ setShowNav }) {
  const { loading, error, data } = useQuery(QUERY_SONG);
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
      className={`d-flex flex-column justify-content-start`}
    >
      {loading ? (
        <Row
          style={{ minHeight: "100vh" }}
          className="justify-content-center align-items-center"
        >
          <Spinner animation="border" variant="dark" />
        </Row>
      ) : (
        <SongPage data={data} setShowNav={setShowNav} />
      )}
    </Container>
  );
}

function SongPage({ data, setShowNav }) {
  const [albumImg, setAlbumImg] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [openFloatingComments, setOpenFloatingComments] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const isPhoneScreen = useMediaQuery("(max-width:630px)");
  const isBigScreen = useMediaQuery("(min-width:850px)");
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
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
      <SongIntroLargeScreen setShowNav={setShowNav} />
      <div className="relative-container">
        <Row
          className="justify-content-around align-items-center"
          style={{
            marginTop: !isPhoneScreen ? "8vh" : 0,
            minHeight: "92vh",
          }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              layout
              className={`col-xs-12 col-sm-9 col-md-5 col-lg-5`}
            >
              <Row className="justify-content-center">
                <Image
                  fluid
                  src={albumImg}
                  className={`mt-2 mb-2`}
                  style={{ maxWidth: "95%" }}
                />
              </Row>
              <Row>
                <p className="song-title">{data.song.song_name ?? ""}</p>
              </Row>
              <Row>
                <p className="artist-name">{data.song.artist ?? ""}</p>
              </Row>
              <Row>
                <SharePlay
                  setFloatingComments={setOpenChat}
                  spotify_link={data.song.spotify_link}
                  apple_music_link={data.song.apple_music_link}
                />
              </Row>
            </motion.div>
            {openChat && (
              <motion.div
                className="col-xs-12 col-md-6"
                initial={{ x: "100%" }} // Start from the left side, out of the viewport
                animate={{ x: "0%" }} // Move to the original position
                exit={{ x: "100%" }} // Exit to the left side when removed from the DOM
                transition={{ duration: 0.3 }} // Animation duration (optional)
              >
                {/* Your new column content */}
                <ReactionBanner albumImage={albumImg} />
              </motion.div>
            )}
          </AnimatePresence>
        </Row>
      </div>
    </>
  );
}
