import {
  Button,
  Col,
  Collapse,
  Container,
  Image,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { QUERY_SONGINFO } from "../queries/songInfoQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { getPlatformIcon } from "../utils/utils";
import HorizontalCollapse from "./HorizontalCollapse.js";
import { useMediaQuery } from "@mui/material";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useToggleComponents } from "../contexts/ToggleComponents";
import { QUERY_ALBUMINFO } from "../queries/albumInfoQuery";

const ProducerLink = ({ producer }) => {
  return (
    <a
      className="text-white text-decoration-none"
      href={producer.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {producer.name}
    </a>
  );
};
const RecursiveRenderer = ({ data, parentKey = "" }) => {
  if (!data) return null;
  if (typeof data === "string") {
    return data.trim() !== "" ? data : <></>;
  }
  const { tag, attributes, children } = data;
  const Tag = tag;

  // Check if the tag is an anchor element and add target and rel attributes
  const updatedAttributes =
    tag === "a"
      ? {
          ...attributes,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-white text-decoration-none fw-bold",
        }
      : attributes;

  return (
    <Tag {...updatedAttributes}>
      {children &&
        children.map((child, index) => {
          const newKey = `${parentKey}-${tag}-${index}`;
          return (
            <RecursiveRenderer key={newKey} data={child} parentKey={newKey} />
          );
        })}
    </Tag>
  );
};

function ArtistInfo({
  artist_bio,
  artist_image_url,
  artist_name,
  socialHandles,
}) {
  const targetRowRef = useRef(null);
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width:765px)");
  const isMedScreen = useMediaQuery("(max-width:1270px)");
  const [showArrowIcon, setShowArrowIcon] = useState(true);
  const handleScroll = () =>
    setShowArrowIcon(containerRef.current.scrollTop <= 0);
  const scrollArtistMoreDetails = () => {
    const container = document.querySelector(".container-scroll");
    const targetTop = targetRowRef.current.offsetTop - 48;

    container.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };
  return (
    <Container
      ref={containerRef}
      onScroll={handleScroll}
      className="text-white py-2 container-scroll"
      style={{ height: "77vh", overflowY: "auto" }}
    >
      <Row style={{ minHeight: "77vh" }}>
        <Col className="d-flex flex-column justify-content-between">
          <Row className="pt-3">
            <Col
              xs={12}
              md={8}
              className={`d-flex justify-content-${
                isSmallScreen ? "center" : "start"
              }`}
            >
              <Image
                style={{ objectFit: "contain" }}
                width="100%"
                height="auto"
                src={artist_image_url}
              />
            </Col>
            <Col
              className={`d-flex flex-${
                isSmallScreen ? "row" : "column"
              } justify-content-start pt-3`}
              xs={12}
              md={4}
            >
              {/* render socials */}
              {Object.keys(socialHandles).map((platform) => (
                <a
                  href={`https://${platform}.com/${
                    (platform === "youtube" || platform === "tiktok") &&
                    socialHandles[platform]
                      ? "@"
                      : ""
                  }${socialHandles[platform] ?? ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none m-2"
                >
                  <Row>
                    <Col xs={12} sm={2}>
                      <FontAwesomeIcon
                        icon={getPlatformIcon(platform)}
                        size="lg"
                        className="text-white"
                      />
                    </Col>
                    {!isSmallScreen && (
                      <Col className="d-flex justify-content-start">
                        <span>
                          {platform == "apple_music" ? "apple music" : platform}
                        </span>
                      </Col>
                    )}
                  </Row>
                </a>
              ))}
            </Col>
          </Row>
          <Row>
            <Col className={`text-start`}>
              <h1 style={{ fontSize: "clamp(3rem,5vw,3.5rem)" }}>
                {artist_name}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className="text-start">
              <RecursiveRenderer data={artist_bio.children[0]} />
            </Col>
          </Row>
          <Row>
            <Col>
              {showArrowIcon ? (
                <Button
                  className="bg-transparent border-0"
                  onClick={scrollArtistMoreDetails}
                >
                  <KeyboardDoubleArrowDownIcon />
                </Button>
              ) : (
                <hr className="border-white" />
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="text-start mb-5" ref={targetRowRef}>
        <Col>
          {artist_bio.children.slice(1).map((child, index) => (
            <RecursiveRenderer key={index} data={child} fluid />
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="pe-3">Retrieved from</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://genius.com"
          >
            <Image height={30} src="/Genius_logo.png" />
          </a>
        </Col>
      </Row>
    </Container>
  );
}
function AlbumInfo({ album_bio, album_name, album_art, album_release_date }) {
  const targetRowRef = useRef(null);
  const containerRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width:765px)");
  const isMedScreen = useMediaQuery("(max-width:1270px)");
  const [showArrowIcon, setShowArrowIcon] = useState(true);
  const handleScroll = () =>
    setShowArrowIcon(containerRef.current.scrollTop <= 0);
  const scrollAlbumMoreDetails = () => {
    const container = document.querySelector(".container-scroll");
    const targetTop = targetRowRef.current.offsetTop - 48;

    container.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };
  return (
    <Container
      className="text-white py-2 container-scroll"
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: "77vh", overflowY: "auto" }}
    >
      <Row style={{ minHeight: "77vh" }}>
        <Col className="d-flex flex-column justify-content-between">
          <Row className="pt-3">
            <Col
              xs={12}
              md={6}
              className={`d-flex justify-content-${
                isSmallScreen ? "center" : "start"
              }`}
            >
              <Image
                width="100%"
                height="auto"
                style={{ objectFit: "contain" }}
                src={album_art}
              />
            </Col>
            <Col
              className={`d-flex flex-${
                isSmallScreen ? "row" : "column"
              } justify-content-end pt-3`}
              xs={12}
              md={6}
            >
              {/* <Row>
                <Col
                  className={`d-flex justify-content-center`}
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "white",
                    padding: "10px 0",
                    whiteSpace: "nowrap",
                  }}
                >
                  Tracks
                </Col>
              </Row> */}
              <Row>
                <Col>
                  <Row>
                    <Col className="p-0 d-flex justify-content-start ps-1">
                      <small
                        className="text-muted pe-2"
                        style={{
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Release Date
                      </small>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-start ps-1">
                      <span>{album_release_date}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className={`text-start`}>
              <h1 style={{ fontSize: "clamp(3rem,5vw,3.5rem)" }}>
                {album_name}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className="text-start">
              <RecursiveRenderer data={album_bio.children[0]} />
            </Col>
          </Row>
          <Row>
            <Col>
              {showArrowIcon ? (
                <Button
                  className="bg-transparent border-0"
                  onClick={scrollAlbumMoreDetails}
                >
                  <KeyboardDoubleArrowDownIcon />
                </Button>
              ) : (
                <hr className="border-white" />
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="text-start mb-5" ref={targetRowRef}>
        <Col>
          {album_bio.children.slice(1).map((child, index) => (
            <RecursiveRenderer key={index} data={child} fluid />
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="pe-3">Retrieved from</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://genius.com"
          >
            <Image height={30} src="/Genius_logo.png" />
          </a>
        </Col>
      </Row>
    </Container>
  );
}
function SongInfo({
  song_bio,
  song_name,
  song_art,
  song_producers,
  song_writers,
  song_release_date,
}) {
  const targetRowRef = useRef(null);
  const containerRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width:765px)");
  const isMedScreen = useMediaQuery("(max-width:1270px)");
  const [showArrowIcon, setShowArrowIcon] = useState(true);
  const handleScroll = () =>
    setShowArrowIcon(containerRef.current.scrollTop <= 0);
  const scrollSongMoreDetails = () => {
    const container = document.querySelector(".container-scroll");
    const targetTop = targetRowRef.current.offsetTop - 48;

    container.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };
  return (
    <Container
      ref={containerRef}
      onScroll={handleScroll}
      className="text-white py-2 container-scroll"
      style={{ height: "77vh", overflowY: "auto" }}
    >
      <Row style={{ minHeight: "77vh" }}>
        <Col className="d-flex flex-column justify-content-between">
          <Row className="pt-3">
            <Col
              xs={12}
              md={6}
              className={`d-flex justify-content-${
                isSmallScreen ? "center" : "start"
              }`}
            >
              <Image
                width="100%"
                height="auto"
                src={song_art}
                style={{ objectFit: "contain" }}
              />
            </Col>
            <Col
              className={`d-flex justify-content-between flex-column pt-3 ps-4`}
              xs={12}
              md={6}
            >
              <Row>
                <Col
                  className={`d-flex justify-content-${
                    isSmallScreen ? "start" : "center"
                  } ps-1`}
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "white",
                    whiteSpace: "nowrap",
                  }}
                >
                  Credits
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col className="p-0 d-flex justify-content-start ps-1">
                      <small
                        className="text-muted "
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Producers
                      </small>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0">
                      <div
                        className={`d-flex justify-content-start flex-wrap`}
                        style={{ flexWrap: "wrap" }}
                      >
                        {song_producers.map((producer, index) => (
                          <span key={index} className="px-1">
                            <ProducerLink producer={producer} />
                          </span>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col className="p-0 d-flex justify-content-start ps-1">
                      <small
                        className="text-muted"
                        style={{
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Writers
                      </small>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0">
                      <div className={`d-flex justify-content-start flex-wrap`}>
                        {song_writers.map((writer, index) => (
                          <span key={index} className="px-1">
                            <ProducerLink producer={writer} />
                          </span>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col className="p-0 d-flex justify-content-start ps-1">
                      <small
                        className="text-muted pe-2"
                        style={{
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Release Date
                      </small>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-start ps-1">
                      <span>{song_release_date}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className={`text-start`}>
              <h1 style={{ fontSize: "clamp(3rem,5vw,3.5rem)" }}>
                {song_name}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className="text-start">
              <RecursiveRenderer data={song_bio.children[0]} />
            </Col>
          </Row>
          <Row>
            <Col>
              {showArrowIcon ? (
                <Button
                  className="bg-transparent border-0"
                  onClick={scrollSongMoreDetails}
                >
                  <KeyboardDoubleArrowDownIcon />
                </Button>
              ) : (
                <hr className="border-white" />
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="text-start mb-5" ref={targetRowRef}>
        <Col>
          {song_bio.children.slice(1).map((child, index) => (
            <RecursiveRenderer key={index} data={child} fluid />
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="pe-3">Retrieved from</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://genius.com"
          >
            <Image height={30} src="/Genius_logo.png" />
          </a>
        </Col>
      </Row>
    </Container>
  );
}
function ArtistSongInfo({ active_tab = "Artist" }) {
  const { loading, error, data } = useQuery(QUERY_SONGINFO);
  const {
    loading: albumDataLoading,
    error: albumDataError,
    data: albumData,
  } = useQuery(QUERY_ALBUMINFO);
  const { setOpenSongInfo } = useToggleComponents();
  const [artistBio, setArtistBio] = useState({});
  const [songBio, setSongBio] = useState({});
  const [songProducers, setSongProducers] = useState({});
  const [songWriters, setSongWriters] = useState({});
  const [albumBio, setAlbumBio] = useState({});
  const [socialHandles, setSocialHandles] = useState({
    instagram: null,
    twitter: null,
    facebook: null,
  });

  useEffect(() => {
    if (data && albumData) {
      setArtistBio(JSON.parse(data.songInfo.artist_bio).dom);
      setSongBio(JSON.parse(data.songInfo.song_bio).dom);
      setSongProducers(JSON.parse(data.songInfo.song_producers));
      setSongWriters(JSON.parse(data.songInfo.song_writers));
      setSocialHandles({
        instagram: data.songInfo.artist_instagram,
        twitter: data.songInfo.artist_twitter,
        facebook: data.songInfo.artist_facebook,
      });
      setAlbumBio(JSON.parse(albumData.albumInfo.album_bio).dom);
    }
  }, [data]);
  if (error) {
    console.log("Error fetching artist bio", error);
  }
  if (albumDataError) {
    console.log("Error fetching album bio", albumDataError);
  }
  return loading ||
    albumDataLoading ||
    Object.keys(artistBio).length === 0 ||
    Object.keys(songBio).length === 0 ||
    Object.keys(albumBio).length === 0 ||
    Object.keys(songProducers).length === 0 ||
    Object.keys(songWriters).length === 0 ? (
    <Container>
      {" "}
      <Spinner animation="border" role="status" variant="light" />
    </Container>
  ) : (
    <div className="tab-content-wrapper p-0 m-0">
      <Button
        className="position-absolute bg-transparent border-0 start-0 top-0"
        style={{ zIndex: 888 }}
        onClick={() =>
          setOpenSongInfo((openSongInfo) => ({
            openInfo: false,
            active_tab: openSongInfo.active_tab,
          }))
        }
      >
        <FontAwesomeIcon size="xl" icon={faXmark} />
      </Button>
      <Tabs
        defaultActiveKey={active_tab}
        className="custom-tabs"
        justify
        transition={HorizontalCollapse}
        mountOnEnter
        unmountOnExit
      >
        <Tab eventKey="Artist" title="Artist">
          <ArtistInfo
            artist_bio={artistBio}
            artist_image_url={data.songInfo.artist_image_url}
            artist_name={data.songInfo.artist_name}
            socialHandles={socialHandles}
          />
        </Tab>
        {data.songInfo.is_song_on_album && (
          <Tab eventKey="Album" title="Album">
            <AlbumInfo
              album_bio={albumBio}
              album_art={albumData.albumInfo.album_art}
              album_release_date={albumData.albumInfo.album_release_date}
              album_name={albumData.albumInfo.album_name}
            />
          </Tab>
        )}
        <Tab eventKey="Song" title="Song">
          <SongInfo
            song_bio={songBio}
            song_name={data.songInfo.song_name}
            song_art={data.songInfo.song_art}
            song_album={data.songInfo.song_album}
            song_producers={songProducers}
            song_writers={songWriters}
            song_release_date={data.songInfo.song_release_date}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
export default ArtistSongInfo;
