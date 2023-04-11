import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import {
  Button,
  Col,
  Dropdown,
  ListGroup,
  OverlayTrigger,
  Popover,
  Row,
  Spinner,
} from "react-bootstrap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { GET_USER_PREFERENCES_NAME } from "../queries/UserPreferencesQuery";
import { useQuery } from "@apollo/client";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { getPlatformIcon } from "../utils/utils";

export default function CommentB({ avatar, username, body, title, time }) {
  const [truncateComment, setTruncateComment] = useState(true);
  const [isTruncated, setIsTruncated] = useState(false);
  const [noSocials, setNoSocials] = useState(true);
  const [socialHandles, setSocialHandles] = useState({
    youtube: null,
    instagram: null,
    facebook: null,
    tiktok: null,
    twitter: null,
  });
  const commentRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { loading, error, data } = useQuery(GET_USER_PREFERENCES_NAME, {
    variables: { username: username },
    onCompleted: (queryData) => {
      setSocialHandles({
        youtube: queryData.userPreference.youtube_handle,
        instagram: queryData.userPreference.instagram_handle,
        facebook: queryData.userPreference.facebook_handle,
        tiktok: queryData.userPreference.tiktok_handle,
        twitter: queryData.userPreference.twitter_handle,
      });
    },
  });
  console.log(error);
  console.log(data);
  const ProfilePopover = (props) => {
    return (
      <>
        {loading ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Popover {...props} bsPrefix="popover darker-container min-w-popover">
            <Popover.Header className="darker-container text-white d-flex justify-content-center align-items-center">
              Profile
            </Popover.Header>
            <Popover.Body className="pb-2">
              <Row>
                <Col className="d-flex justify-content-start text-white">
                  <span style={{ fontWeight: "bold" }}>BIO</span>
                </Col>
              </Row>
              <Row
                className="rounded-1 py-1 mx-0 px-0 text-white"
                style={{ background: "rgba(41,41,41, 0.4)" }}
              >
                <Col>
                  <p className="mb-0 text-start">
                    {data.userPreference.bio !== ""
                      ? data.userPreference.bio
                      : "no-bio"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-start text-white">
                  <span style={{ fontWeight: "bold" }}>SOCIALS</span>
                </Col>
              </Row>
              <Row
                className="rounded-1 py-1 mx-0 px-0 "
                style={{ background: "rgba(41,41,41, 0.4)" }}
              >
                {Object.keys(socialHandles).map((platform) => {
                  if (
                    socialHandles[platform] &&
                    socialHandles[platform] !== ""
                  ) {
                    setNoSocials(false);
                    return (
                      <Row>
                        <Col xs={3}>
                          <FontAwesomeIcon
                            className="text-white"
                            icon={getPlatformIcon(platform)}
                          />
                        </Col>
                        <Col xs={9}>
                          <a
                            href={`https://${platform}.com/${
                              (platform === "youtube" ||
                                platform === "tiktok") &&
                              socialHandles[platform]
                                ? "@"
                                : ""
                            }${socialHandles[platform] ?? ""}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-transparent border-0 text-white"
                          >
                            {socialHandles[platform]}
                          </a>
                        </Col>
                      </Row>
                    );
                  }
                })}
                {noSocials && (
                  <span className="text-white mb-0">no-socials</span>
                )}
              </Row>
            </Popover.Body>
          </Popover>
        )}
      </>
    );
  };
  useEffect(() => {
    setIsTruncated(
      commentRef.current.scrollHeight > commentRef.current.clientHeight
    );
  }, [commentRef]);
  let dateTime = new Date(time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <ListGroup.Item
      className={`text-white mx-2 my-1 pt-2 rounded-1`}
      style={{
        backgroundColor: "rgba(0,0,0,0.2)",
        border: "solid 1px rgba(255,255,255,0.3)",
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      //   onHide={() => setIsHidden(true)}
    >
      <Row>
        <Col xs={2} lg={1} className="d-flex justify-content-end">
          <Avatar
            textSizeRatio={2}
            name={username}
            src={avatar}
            size="35"
            round
          />
        </Col>
        <Col xs={10} lg={11}>
          <Row
            style={{ height: "35px" }}
            className="d-flex justify-content-center align-items-center"
          >
            <Col className="d-flex justify-content-start ps-0">
              <OverlayTrigger
                trigger="click"
                placement="auto"
                delay={{ show: 250, hide: 0 }}
                overlay={ProfilePopover}
                rootClose={true}
              >
                <strong style={{ cursor: "pointer" }}>{username}</strong>
              </OverlayTrigger>
            </Col>
            <Col xs={4} lg={2} className="d-flex justify-content-end pe-4">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  bsPrefix="p-0"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.0)", border: "0" }}
                >
                  <FontAwesomeIcon
                    flip="horizontal"
                    icon={faEllipsis}
                    className={`${isFocused ? "visible" : "hidden"}`}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
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
          <Row>
            <Col className="d-flex justify-content-start ps-0">
              <strong style={{ fontSize: "clamp(1rem, 5vw, 1.3rem)" }}>
                {title}
              </strong>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ fontSize: "clamp(0.55rem, 5vw, 0.8rem)" }}
              className="d-flex justify-content-start text-center ps-0"
            >
              <p
                ref={commentRef}
                className={`${
                  truncateComment && "review-truncate"
                } text-start mb-0`}
                style={{ whiteSpace: "pre-line" }}
              >
                {body}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start ps-0 mt-2">
              <small
                style={{ fontSize: "clamp(0.5rem, 5vw, 0.8rem)" }}
                className="text-muted"
              >
                {dateTime}
              </small>
            </Col>
            <Col className="d-flex justify-content-end">
              {isTruncated && truncateComment ? (
                <Button
                  className="text-white bg-transparent border-0"
                  onClick={() => {
                    setTruncateComment(!truncateComment);
                  }}
                >
                  <ExpandMoreIcon />
                </Button>
              ) : (
                isTruncated &&
                !truncateComment && (
                  <Button
                    className="bg-transparent border-0 text-white"
                    onClick={() => {
                      setTruncateComment(!truncateComment);
                    }}
                  >
                    <ExpandLessIcon />
                  </Button>
                )
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}
