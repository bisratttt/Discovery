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

export default function SongPageFetch() {
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
        <SongPage data={data} />
      )}
    </Container>
  );
}

function SongPage({ data }) {
  const [albumImg, setAlbumImg] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [openFloatingComments, setOpenFloatingComments] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const isPhoneScreen = useMediaQuery("(max-width:630px");
  const isBigScreen = useMediaQuery("(min-width:850px");
  const isLargeScreen = useMediaQuery("min-width:1200px");
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
      {/* background image and blur effect for background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: -1,
          filter: "blur(15px)",
          backgroundImage: `url(${albumImg})`,
          backgroundSize: "cover",
          transform: "scale(1.1)",
        }}
      />
      {/* darker background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      />
      {/* add the intro animation */}
      <SongIntroLargeScreen />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
        }}
      >
        {/* <Row className="justify-content-end m-3">
          <Col className="d-flex justify-content-end">
            <BootstrapSwitchButton
              checked={false}
              onlabel="Chat"
              offlabel="Chat"
              onChange={() => setOpenChat(!openChat)}
              width={100}
              onstyle="success"
              offstyle="dark"
              style={{ borderRadius: "2" }}
            />
          </Col>
        </Row> */}
        {/* this is after we open the chat, we need another display for the song alone */}
        <Row className="vh-100 justify-content-center align-items-center">
          <Col xs={12} sm={openChat ? 6 : 12} className="shrink-grow">
            <Row
              className={`justify-content-${
                openFloatingComments ? "end" : "center"
              }`}
            >
              {/* {!isPhoneScreen && !openChat && <Col></Col>} */}

              <Col xs={12} sm={isBigScreen && !openChat ? 6 : 12}>
                <Image
                  fluid
                  src={albumImg}
                  className={`mt-2 mb-2 h-auto image-container`}
                />
                <Row>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.5em",
                      marginBottom: 0,
                    }}
                    className="text-white"
                  >
                    {data.song.song_name ?? ""}
                  </p>
                </Row>

                <Row>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.5em",
                      color: "#ccc",
                      marginBottom: 0,
                    }}
                  >
                    {data.song.artist ?? ""}
                  </p>
                </Row>

                <Row className="mb-3">
                  <SharePlay
                    setFloatingComments={setOpenFloatingComments}
                    spotify_link={data.song.spotify_link}
                    apple_music_link={data.song.apple_music_link}
                  />
                </Row>
              </Col>
              {openFloatingComments && (
                <Col
                  xs={12}
                  sm={isBigScreen ? 3 : 12}
                  className="d-flex align-items-end"
                >
                  <FloatingComment />
                </Col>
              )}
            </Row>
          </Col>
          {openChat && (
            <Col
              xs={12}
              sm={6}
              className={`chat-col ${openChat ? "active" : ""}`}
            >
              <Chat setOpenChat={setOpenChat} />
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}
