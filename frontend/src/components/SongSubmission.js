import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import { Row, Col, ListGroup } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { getMetaphorialTime } from "../utils/utils";
import SubmissionReaction from "./SubmissionReaction";
import UsernameWithProfile from "./design-system/UsernameWithProfile";
import { useRealmApp } from "../contexts/RealmApp";

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

async function fetchSearchData({ song_name, artist, currentUser }) {
  try {
    console.log(currentUser);
    const result = await currentUser.callFunction(
      "searchYoutubeSong",
      song_name + " " + artist
    );

    // Do something with the result
    return result;
  } catch (error) {
    console.error(error);
    // Handle the error
  }
}

export default function SongSubmission({
  username,
  song_name,
  artist,
  note,
  time,
  _id,
  youtube_id,
}) {
  const submissionRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [result, setResult] = useState(null);
  const submission_id = _id;

  let dateTime = getMetaphorialTime(time);
  const { currentUser } = useRealmApp();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log(currentUser);
  //     const result = await fetchSearchData(song_name, artist, currentUser);
  //     setResult(result); // Set the result in the state
  //     console.log(result);
  //     // Do something with the result
  //   };
  //   fetchData();
  // }, []);

  return (
    <ListGroup.Item
      className={`${
        isHidden ? "hidden" : "visible"
      } row d-flex align-items-start
      justify-content-between text-white m-0 p-0 pt-3 rounded-0 rounded-top pb-2`}
      style={{
        backgroundColor: "rgba(0,0,0,0.2)",
        borderBottom: "solid rgba(255,255,255,0.5) 0.01rem",
      }}
    >
      {/* <Col xs={2}>
        <FontAwesomeIcon icon={faPlay} size="2x" />
      </Col> */}
      <Col xs={12}>
        <Row>
          <Col
            xs={9}
            className="d-flex justify-content-start align-items-center overflow-hidden"
            style={{ fontSize: "1.2rem" }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            {isHovered ? (
              <Marquee gradient={false} pauseOnClick={true}>
                <span className="me-4">
                  {song_name} - {artist}
                </span>
              </Marquee>
            ) : (
              <span className="text-truncate">
                {song_name} - {artist}
              </span>
            )}
          </Col>

          <Col xs={3}>
            <small style={{ fontSize: "0.75rem" }} className="text-muted">
              {dateTime}
            </small>
          </Col>
        </Row>
        <Row style={{ minHeight: "50vh" }}>
          <YoutubeEmbed srcId={youtube_id} />
        </Row>
        <Row className="mt-2" style={{ fontSize: "0.9rem" }}>
          <Col
            xs={1}
            className="d-flex justify-content-end align-items-start pe-1 mb-1"
          >
            <Avatar textSizeRatio={2.1} name={username} size="20" round />
          </Col>
          <Col
            xs={11}
            className="d-flex justify-content-start align-items-start ps-0 pe-2 text-start"
          >
            <UsernameWithProfile username={username} />
          </Col>
        </Row>
        <Row className="pb-1 px-3">
          {note.length > 0 && (
            <Col
              className="d-flex justify-content-start align-items-center py-1 ps-2 text-start rounded-2 w-100"
              style={{
                backgroundColor: "rgba(30,30,30, 0.7)",
                fontSize: "0.8rem",
                wordWrap: "anywhere",
              }}
            >
              <p className="mb-0 text-start">{note}</p>
            </Col>
          )}
        </Row>
        <Row className="justify-content-end">
          <Col xs={7} className="p-1 me-5">
            <SubmissionReaction submissionId={submission_id} />
          </Col>
        </Row>
      </Col>
    </ListGroup.Item>
  );
}
