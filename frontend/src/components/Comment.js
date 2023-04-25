import { faEllipsis, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";
import { Button, Col, Dropdown, ListGroup, Row } from "react-bootstrap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useRealmApp } from "../contexts/RealmApp";
import UsernameWithProfile from "./design-system/UsernameWithProfile";
import ReviewModal from "./ReviewWriteModal";
//import ReviewEditModal from "./ReviewEditModal";
import ReactionList from "./design-system/ReactionBadge";
import ReviewReactions from "./ReviewReactions";
//import ReviewCommentCard from "./reviewCommentCard";
import { getMetaphorialTime } from "../utils/utils";

export default function Comment({ avatar, username, body, title, time, _id }) {
  const [truncateComment, setTruncateComment] = useState(true);
  const [isTruncated, setIsTruncated] = useState(false);
  const { currentUser } = useRealmApp();
  const owner = username === currentUser.profile.email;
  const commentRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [commentsHidden, setCommentsHidden] = useState(false);
  const [commentReaction, setCommentReaction] = useState({
    "❤️": null,
    "🔥": null,
    "👍": null,
    "👎": null,
  });
  useEffect(() => {
    setIsTruncated(
      commentRef.current.scrollHeight > commentRef.current.clientHeight
    );
  }, [commentRef]);
  let dateTime = getMetaphorialTime(time);

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
          <Row className="d-flex justify-content-center align-items-center">
            <Col>
              <Row style={{ height: "20px" }}>
                <Col className="d-flex justify-content-start ps-0 pb-0">
                  {currentUser.providerType === "api-key" ? (
                    <strong>{username}</strong>
                  ) : (
                    <UsernameWithProfile username={username} />
                  )}
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-start ps-0">
                  <small
                    style={{ fontSize: "clamp(0.5rem, 5vw, 0.7rem)" }}
                    className="text-muted"
                  >
                    {dateTime}
                  </small>
                </Col>
              </Row>
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
                  {owner && (
                    <Dropdown.Item
                      className="review-dropdown-item"
                      onClick={() => setEditModal(true)}
                    >
                      Edit
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item className="review-dropdown-item">
                    Hide
                  </Dropdown.Item>
                  <Dropdown.Item className="review-dropdown-item">
                    Report
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <ReviewModal
                show={showEditModal}
                onHide={() => setEditModal((modal) => !modal)}
                title="Edit your review"
                oldtitle={title}
                oldbody={body}

              />
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
            <Col xs={9} className="d-flex justify-content-start p-0 mt-2">
              <ReviewReactions reviewId={_id} />
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
