import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import { Button, Col, Dropdown, ListGroup, Row } from "react-bootstrap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useRealmApp } from "../contexts/RealmApp";
import UsernameWithProfile from "./design-system/UsernameWithProfile";

export default function CommentB({ avatar, username, body, title, time }) {
  const [truncateComment, setTruncateComment] = useState(true);
  const [isTruncated, setIsTruncated] = useState(false);
  const { currentUser } = useRealmApp();
  const commentRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

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
              {currentUser.providerType === "api-key" ? (
                <strong>{username}</strong>
              ) : (
                <UsernameWithProfile username={username} />
              )}
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
                <Dropdown.Menu id="review-dropdown">
                  <Dropdown.Item className="review-dropdown-item">
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item className="review-dropdown-item">
                    Hide
                  </Dropdown.Item>
                  <Dropdown.Item className="review-dropdown-item">
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
