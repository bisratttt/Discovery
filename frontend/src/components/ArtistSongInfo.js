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
import Marquee from "react-fast-marquee";
import { useSwipeable } from "react-swipeable";
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

const HoveringTracks = ({ track }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:765px)");

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {isHovered ? (
        <Marquee gradient={false} pauseOnClick={true}>
          <Col xs={isSmallScreen ? 6 : 12}>
            <Row>
              <Col className="d-flex justify-content-start">
                {track.number}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-white ps-3"
                  href={track.song.url}
                >
                  {track.song.title_with_featured}
                </a>
              </Col>
            </Row>
          </Col>
        </Marquee>
      ) : (
        <Col xs={isSmallScreen ? 6 : 12}>
          <Row>
            <Col className="d-flex justify-content-start">
              {track.number}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-white text-truncate ps-3"
                href={track.song.url}
              >
                {track.song.title_with_featured}
              </a>
            </Col>
          </Row>
        </Col>
      )}
    </div>
  );
};
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

  // Check if the tag is an anchor element with a YouTube link
  const isYoutubeLink =
    tag === "a" &&
    attributes.href &&
    attributes.href.startsWith("https://youtu.be/");

  // Extract the YouTube video ID if it's a YouTube link
  const youtubeId = isYoutubeLink
    ? attributes.href.split("https://youtu.be/")[1]
    : null;

  // Render the YouTube video using the YoutubeEmbed component if it's a YouTube link
  if (isYoutubeLink) {
    return (
      <Row style={{ minHeight: "40dvh" }}>
        <YoutubeEmbed srcId={youtubeId} />
      </Row>
    );
  }

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
  const [loading, setLoading] = useState(false);
  useEffect(
    () => setLoading(Object.keys(artist_bio).length === 0),
    [artist_bio]
  );
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
  return loading ? (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ height: "85dvh" }}
    >
      <Spinner animation="border" role="status" variant="light" />
    </Container>
  ) : (
    <Container
      ref={containerRef}
      onScroll={handleScroll}
      className="text-white py-2 container-scroll"
      style={{ height: "85dvh", overflowY: "auto" }}
    >
      <Row style={{ minHeight: "85dvh" }}>
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
              {Object.keys(socialHandles ?? {}).map((platform, index) => (
                <a
                  key={index}
                  href={`https://${platform}.com/${
                    (platform === "youtube" || platform === "tiktok") &&
                    socialHandles?.[platform]
                      ? "@"
                      : ""
                  }${socialHandles?.[platform] ?? ""}`}
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
              <RecursiveRenderer data={artist_bio?.children?.[0] ?? null} />
            </Col>
          </Row>
          <Row>
            <Col>
              {showArrowIcon && !isSmallScreen ? (
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
          {artist_bio?.children?.slice(1).map((child, index) => (
            <RecursiveRenderer key={index} data={child ?? null} fluid />
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
function AlbumInfo({
  album_bio,
  album_name,
  album_art,
  album_release_date,
  album_tracks,
}) {
  const targetRowRef = useRef(null);
  const containerRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width:765px)");
  const isMedScreen = useMediaQuery("(max-width:1270px)");
  const [showArrowIcon, setShowArrowIcon] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => setLoading(Object.keys(album_bio).length === 0), [album_bio]);
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
  return loading ? (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ height: "85dvh" }}
    >
      <Spinner animation="border" role="status" variant="light" />
    </Container>
  ) : (
    <Container
      className="text-white py-2 container-scroll"
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: "85dvh", overflowY: "auto" }}
    >
      <Row style={{ minHeight: "79dvh" }}>
        <Col className="d-flex flex-column justify-content-between">
          <Row className="pt-3 ps-2">
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
            <Col className={`pt-3`} xs={12} md={6}>
              {
                <Row>
                  <Col className={`d-flex flex-column justify-content-center`}>
                    <Row>
                      <Col className="d-flex justify-content-center">
                        <h4>Track List</h4>
                      </Col>
                    </Row>
                    <Row>
                      {album_tracks.map((track, index) => (
                        <span key={index}>
                          <HoveringTracks track={track} />
                        </span>
                      ))}
                    </Row>
                  </Col>
                </Row>
              }
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
              <RecursiveRenderer data={album_bio?.children?.[0] ?? null} />
            </Col>
          </Row>
          <Row>
            <Col>
              {showArrowIcon && !isSmallScreen ? (
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
          {album_bio?.children?.slice(1)?.map((child, index) => (
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
  const [loading, setLoading] = useState(false);
  useEffect(
    () =>
      setLoading(
        Object.keys(song_bio).length === 0 ||
          song_producers === undefined ||
          song_writers === undefined
      ),
    [song_bio]
  );
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
  return loading ? (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ height: "85dvh" }}
    >
      <Spinner animation="border" role="status" variant="light" />
    </Container>
  ) : (
    <Container
      ref={containerRef}
      onScroll={handleScroll}
      className="text-white py-2 container-scroll"
      style={{ height: "85dvh", overflowY: "auto" }}
    >
      <Row style={{ minHeight: "85dvh" }}>
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
                        {song_producers?.map((producer, index) => (
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
                        {song_writers?.map((writer, index) => (
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
              <RecursiveRenderer data={song_bio?.children?.[0] ?? null} />
            </Col>
          </Row>
          <Row>
            <Col>
              {showArrowIcon && !isSmallScreen ? (
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
          {song_bio?.children?.slice(1)?.map((child, index) => (
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
  const [albumTracks, setAlbumTracks] = useState([]);
  const [tabIdx, setTabIdx] = useState(0);
  const [socialHandles, setSocialHandles] = useState({
    instagram: null,
    twitter: null,
    facebook: null,
  });
  const swipeHandler = useSwipeable({
    onSwipedLeft: () => setTabIdx(Math.max(tabIdx - 1, 0)),
    onSwipedRight: () => setTabIdx((tabIdx + 1) % 3),
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
      setAlbumTracks(JSON.parse(albumData.albumInfo.album_tracks).tracks);
    }
  }, [data, albumData]);
  if (error) {
    console.log("Error fetching artist bio", error);
  }
  if (albumDataError) {
    console.log("Error fetching album bio", albumDataError);
  }
  let idxToName = {
    Artist: 0,
    Album: 1,
    Song: 2,
  };

  return loading || albumDataLoading ? (
    <Container
      fluid
      className="d-flex jusitfy-content-center align-items-center"
    >
      <Spinner animation="border" role="status" variant="light" />
    </Container>
  ) : (
    <div className="tab-content-wrapper p-0 m-0" {...swipeHandler}>
      <Tabs
        activeKey={tabIdx}
        defaultActiveKey={idxToName[active_tab]}
        className="custom-tabs"
        justify
        transition={HorizontalCollapse}
        mountOnEnter
        unmountOnExit
        onSelect={(k) => setTabIdx(parseInt(k))}
      >
        <Tab eventKey={0} title="Artist">
          <ArtistInfo
            artist_bio={artistBio}
            artist_image_url={data?.songInfo?.artist_image_url}
            artist_name={data?.songInfo?.artist_name}
            socialHandles={socialHandles}
          />
        </Tab>
        {data.songInfo.is_song_on_album && (
          <Tab eventKey={1} title="Album">
            <AlbumInfo
              album_bio={albumBio}
              album_art={albumData?.albumInfo?.album_art}
              album_release_date={albumData?.albumInfo?.album_release_date}
              album_name={albumData?.albumInfo?.album_name}
              album_tracks={albumTracks}
            />
          </Tab>
        )}
        <Tab eventKey={2} title="Song">
          <SongInfo
            song_bio={songBio}
            song_name={data?.songInfo?.song_name}
            song_art={data?.songInfo?.song_art}
            song_album={data?.songInfo?.song_album}
            song_producers={songProducers}
            song_writers={songWriters}
            song_release_date={data?.songInfo?.song_release_date}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
export default ArtistSongInfo;
