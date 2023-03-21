import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import { Col, Dropdown, ListGroup } from "react-bootstrap";

export default function CommentB({ avatar, username, body, time }) {
  const [truncateComment, setTruncateComment] = useState(true);
  const [isTruncated, setIsTruncated] = useState(false);
  const commentRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    setIsTruncated(
      commentRef.current.scrollWidth > commentRef.current.clientWidth
    );
  }, [commentRef]);
  let dateTime = new Date(time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <ListGroup.Item
      className={`${isHidden ? "hidden" : "visible"} d-flex align-items-start
      justify-content-between text-white m-0 p-0 pt-2`}
      style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    //   onHide={() => setIsHidden(true)}
    >
      <Col xs={2} sm={1} className="d-flex justify-content-end">
        <Avatar
          textSizeRatio={2}
          name={username}
          src={avatar}
          size="40"
          round
        />
      </Col>
      <Col xs={9} sm={10} className="ms-1">
        <Col
          className="d-flex justify-content-start mb-0 pb-0"
          style={{ fontSize: "clamp(0.7rem, 5vw, 0.9rem)", fontWeight: "600" }}
        >
          {username}
        </Col>
        <Col
          style={{ fontSize: "clamp(0.55rem, 5vw, 0.8rem)" }}
          className="d-flex justify-content-start text-center"
        >
          <p
            ref={commentRef}
            className={`${
              truncateComment && "text-truncate"
            } text-start mb-0 pb-0`}
          >
            {body}
          </p>
        </Col>
        <Col
          className="d-flex justify-content-between"
          style={{ fontSize: "clamp(0.5rem, 5vw, 0.75rem)" }}
        >
          <small className="text-muted">{dateTime}</small>
          {isTruncated && truncateComment ? (
            <button
              style={{
                backgroundColor: "transparent",
                textDecoration: "underline"
              }}
              className="border-0 text-white"
              onClick={() => {setTruncateComment(!truncateComment);}}
            >
              read more
            </button>
          ) : (isTruncated && !truncateComment && (
            <button
              style={{
                backgroundColor: "transparent",
                textDecoration: "underline"
              }}
              className="border-0 text-white"
              onClick={() => {setTruncateComment(!truncateComment);}}
            >
              see less
            </button>
          ))}
        </Col>
      </Col>
      <Col>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" bsPrefix="p-0"
          style={{backgroundColor: "rgba(0, 0, 0, 0.0)", border: "0"}}>
            <FontAwesomeIcon
            flip="horizontal"
            icon={faEllipsis}
            className={`${isFocused ? "visible" : "hidden"}`}/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item style={{fontSize: "clamp(0.65rem, 7vw, 0.85rem"}}>Hide</Dropdown.Item>
            <Dropdown.Item style={{fontSize: "clamp(0.65rem, 7vw, 0.85rem"}}>Report</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </ListGroup.Item>
  );
}
