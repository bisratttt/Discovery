import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Dropdown, ListGroup, Row } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import Marquee from "react-fast-marquee";
import { getMetaphorialTime } from "../utils/utils";
import SubmissionReaction from "./SubmissionReaction";
import UsernameWithProfile from "./design-system/UsernameWithProfile";
import { useRealmApp } from "../contexts/RealmApp";
import { useMediaQuery } from "@mui/material";
import SongSubmissionUpdateEditor from "./SongSubmissionUpdateEditor";

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
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [isFocused, setIsFocused] = useState(true);
  const [editing, setEditing] = useState(false);

  let dateTime = getMetaphorialTime(time);
  const { currentUser } = useRealmApp();
  let owner = username == currentUser.profile.email ? true : false;
  const handleDropdownEditClick = () => {
    setEditing(true);
  };

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
      {editing && (
        <SongSubmissionUpdateEditor
          a={artist}
          s={song_name}
          n={note}
          onHide={() => setEditing((editing) => !editing)}
        />
      )}
      {!editing && (
        <Row className="mx-0 px-0">
          <Col>
            <Row className="ps-1 justify-content-end align-items-center ">
              <Col
                xs={11}
                className="d-flex justify-content-start align-items-center overflow-hidden"
                style={{ fontSize: "1.4rem" }}
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
              <Col xs={1} className="d-flex justify-content-end">
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    bsPrefix="p-0"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.0)",
                      border: "0",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      flip="horizontal"
                      className={`${isFocused ? "visible" : "hidden"}`}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {owner && (
                      <Dropdown.Item
                        onClick={handleDropdownEditClick}
                        style={{ fontSize: "clamp(0.65rem, 7vw, 0.85rem" }}
                      >
                        Edit
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item
                      style={{ fontSize: "clamp(0.65rem, 7vw, 0.85rem" }}
                    >
                      Hide
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontSize: "clamp(0.65rem, 7vw, 0.85rem" }}
                    >
                      Report
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row style={{ minHeight: "50vh" }}>
              <YoutubeEmbed srcId={youtube_id} />
            </Row>
            <Row className="justify-content-end mt-2">
              <Col xs={12} sm={6} md={9} xl={7} className="px-0">
                <SubmissionReaction submissionId={submission_id} />
              </Col>
            </Row>
            <Row
              className={`mt-2 ${isSmallScreen && "ps-3"}`}
              style={{ fontSize: "0.9rem", maxHeight: "3.5vh" }}
            >
              <Col
                xs={1}
                className="d-flex justify-content-end align-items-start pe-1"
              >
                <Avatar textSizeRatio={2.1} name={username} size="20" round />
              </Col>
              <Col className="d-flex justify-content-start align-items-start ps-0 pe-2 text-start">
                <UsernameWithProfile username={username} />
              </Col>
              <Col xs={3} className={`pe-3`}>
                <small
                  style={{ fontSize: "0.75rem" }}
                  className="text-muted d-flex justify-content-end"
                >
                  {dateTime}
                </small>
              </Col>
            </Row>
            <Row className="pb-1 px-3">
              {note.length > 0 && (
                <Col
                  className="d-flex justify-content-start align-items-center py-1 ps-2 text-start rounded-2 w-100"
                  style={{
                    backgroundColor: "rgba(30,30,30, 0.7)",
                    fontSize: "1rem",
                    wordWrap: "anywhere",
                  }}
                >
                  <p className="mb-0 text-start">{note}</p>
                </Col>
              )}
            </Row>
            <Row></Row>
          </Col>
        </Row>
      )}
    </ListGroup.Item>
  );
}
