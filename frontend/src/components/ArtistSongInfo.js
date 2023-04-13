import Container from "react-bootstrap/Container";
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
  const { tag, children } = data;
  const Tag = tag;
  return (
    <Tag>
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

const CarouselPage = React.forwardRef(({ data }, ref) => {
  return (
    <Carousel.Item ref={ref}>
      <SecondaryCarousel data={data} />
    </Carousel.Item>
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
    <Container>
      <Carousel interval={null} controls={false}>
        <CarouselPage data={artistBio} />
        <CarouselPage data={songBio} />
      </Carousel>
    </Container>
  );
}
export default ArtistSongInfo;

// const CarouselPage = ({ childIndex, isMoreDetails }) => {
//   const child = songBio.dom.children[0]
//   return (
//     <Carousel.Item>
//       <RecursiveRenderer data={child} />
//       {isMoreDetails && (
//         <div className="mt-3 text-center">
//           <FontAwesomeIcon icon={faArrowDown} />
//         </div>
//       )}
//     </Carousel.Item>
//   );
// };
//   return (
//     <Container>
//       <Carousel interval={null} controls={false}>
//         <CarouselPage childIndex={0} isMoreDetails />
//         <CarouselPage childIndex={1} />
//       </Carousel>
//     </Container>
//   );
// };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <Carousel>
//             <Carousel.Item>
//             <Container>
//       <Row>
//         <Col><h3 style={{ color: "rgb(155, 54, 13)" }}>
//             📻 Discover new music every day
//           </h3>

//           <p>
//             We believe that every song has the power to inspire and connect
//             people. That's why we're committed to bringing you the best music
//             every day. 🎧 Our team of expert music curators carefully selects
//             each track to ensure that it's high-quality and worth listening to.
//           </p>
// </Col>
//       </Row>
//       </Container>

//             </Carousel.Item>
//             <Carousel.Item>
//             <Container>
//             <Row>
//         <Col><h3 style={{ color: "rgb(155, 54, 13)" }}>
//             🗣️ Exchange thoughts with other music lovers
//           </h3>
//           <p>
//           </p></Col>
//       </Row>
//       </Container>
//             </Carousel.Item>
//             <Carousel.Item>
//               <p>Section 3 Text</p>
//             </Carousel.Item>
//             <Carousel.Item>
//               <p>Section 4 Text</p>
//             </Carousel.Item>
//           </Carousel>
//         </Col>
//       </Row>
//     </Container>
//   );
