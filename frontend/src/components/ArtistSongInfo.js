import {
  Button,
  Col,
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

const RecursiveRenderer = ({ data, parentKey = "" }) => {
  if (!data) return null;
  if (typeof data === "string") {
    return data.trim() !== "" ? data : <></>;
  }
  const { tag, attributes, children } = data;
  const Tag = tag;
  return (
    <Tag {...attributes}>
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
      className="text-white py-2 container-scroll"
      style={{ height: "77vh", overflowY: "auto" }}
    >
      <Row style={{ height: "77vh" }}>
        <Row className="pt-3 justify-content-between">
          <Col xs={12} md={8} className="d-flex justify-content-start">
            <Image height={320} src={artist_image_url} />
          </Col>
          <Col
            className="d-flex flex-column justify-content-around"
            xs={12}
            md={4}
          >
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
                className="text-white text-decoration-none"
              >
                <Row>
                  <Col xs={2}>
                    <FontAwesomeIcon
                      icon={getPlatformIcon(platform)}
                      size="lg"
                      className="text-white"
                    />
                  </Col>
                  <Col className="d-flex justify-content-start">
                    <span>
                      {platform == "apple_music" ? "apple music" : platform}
                    </span>
                  </Col>
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
            <Button
              className="bg-transparent border-0"
              onClick={scrollArtistMoreDetails}
            >
              <KeyboardDoubleArrowDownIcon />
            </Button>
          </Col>
        </Row>
      </Row>

      <Row
        className="text-start"
        style={{ minHeight: "85vh" }}
        ref={targetRowRef}
      >
        <Col>
          {artist_bio.children.slice(1).map((child, index) => (
            <RecursiveRenderer key={index} data={child} fluid />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
function ArtistSongInfo() {
  const { loading, error, data } = useQuery(QUERY_SONGINFO);

  const [artistBio, setArtistBio] = useState({});
  const [songBio, setSongBio] = useState({});
  const [socialHandles, setSocialHandles] = useState({
    youtube: null,
    instagram: null,
    spotify: null,
    apple_music: null,
    tiktok: null,
    twitter: null,
  });

  useEffect(() => {
    if (data) {
      setArtistBio(JSON.parse(data.songInfo.artist_bio).dom);
      setSongBio(JSON.parse(data.songInfo.song_bio).dom);
    }
  }, [data]);
  if (error) {
    console.log("Error fetching artist bio", error);
  }
  return loading ||
    Object.keys(artistBio).length === 0 ||
    Object.keys(songBio).length === 0 ? (
    <Spinner animation="border" role="status" variant="light">
      <div>Loading...</div>
    </Spinner>
  ) : (
    <Tabs defaultActiveKey="Artist" className="custom-tabs" justify>
      <Tab eventKey="Artist" title="Artist">
        <ArtistInfo
          artist_bio={artistBio}
          artist_image_url={data.songInfo.artist_image_url}
          artist_name={data.songInfo.artist_name}
          socialHandles={socialHandles}
        />
      </Tab>
      <Tab eventKey="Song" title="Song"></Tab>
    </Tabs>
  );
}
export default ArtistSongInfo;
