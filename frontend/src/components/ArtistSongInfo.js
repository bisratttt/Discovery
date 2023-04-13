import { Carousel, Spinner } from "react-bootstrap";
import { QUERY_SONGINFO } from "../queries/songInfoQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

const RecursiveRenderer = ({ data }) => {
  if (!data) return null;
  if (typeof data === "string") {
    return data.trim() !== "" ? data : <></>;
  }
  const { tag, attributes, children } = data;
  const Tag = tag;
  return (
    <Tag {...attributes}>
      {children &&
        children.map((child, index) => (
          <RecursiveRenderer key={index} data={child} />
        ))}
    </Tag>
  );
};

const SecondaryCarousel = React.forwardRef(({ data }, ref) => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  return (
    <Carousel
      ref={ref}
      activeIndex={showMoreDetails ? 1 : 0}
      interval={null}
      controls={false}
    >
      <Carousel.Item>
        <RecursiveRenderer data={data.children[0]} />
        <div className="mt-3 text-center">
          <FontAwesomeIcon
            icon={faArrowDown}
            onClick={() => setShowMoreDetails(true)}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        {data.children.slice(1).map((child, index) => (
          <RecursiveRenderer key={index} data={child} />
        ))}
      </Carousel.Item>
    </Carousel>
  );
});

function ArtistSongInfo() {
  const { loading, error, data } = useQuery(QUERY_SONGINFO);
  const [artistBio, setArtistBio] = useState({});
  const [songBio, setSongBio] = useState({});
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
    <Carousel>
      <Carousel.Item>
        <SecondaryCarousel data={artistBio} />
      </Carousel.Item>
      <Carousel.Item>
        <SecondaryCarousel data={songBio} />
      </Carousel.Item>
    </Carousel>
  );
}
export default ArtistSongInfo;
