import { Container, Row, Card, Col } from "react-bootstrap";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "react-avatar";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import useMediaQuery from "@mui/material/useMediaQuery";
import chats from "../test.json";
const authorUsername = "me";

function Chat({ setOpenChat }) {
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const avatarSize = isSmallScreen ? 40 : 45;
  return (
    <>
      <Card
        className="mt-md-2"
        style={{ borderRadius: "5px", maxHeight: "100vh", overflow: "scroll" }}
      >
        <Card.Header style={{ background: "white", fontWeight: "bold" }}>
          <Row>
            <Col className="d-flex justify-content-start">Chat</Col>
            <Col className="d-flex justify-content-end">
              <a
                onClick={() => {
                  setOpenChat(false);
                }}
              >
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </a>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="overflow-auto">
          {chats.map((chat) =>
            authorUsername !== chat.username ? (
              <div className="d-flex flex-row justify-content-start align-items-end">
                <Avatar
                  name={chat.username}
                  round
                  size={avatarSize}
                  className="me-2"
                  textSizeRatio={2}
                />
                <div>
                  <p
                    style={{ fontStyle: "oblique 70deg" }}
                    className="font-italic d-flex justify-content-start m-0 text-muted"
                  >
                    <small>@{chat.username}</small>
                  </p>
                  <p
                    className="small mb-1 me-1 p-2 rounded-1"
                    style={{
                      backgroundColor: "rgba(175, 171, 169, 0.25)",
                    }}
                  >
                    {chat.body}
                  </p>
                </div>
                <p className="small m-1 rounded-3 text-muted">{chat.time}</p>
              </div>
            ) : (
              <div className="d-flex flex-row justify-content-end mb-3 align-items-end">
                <p className="small m-1 rounded-3 text-muted">{chat.time}</p>
                <div>
                  <p
                    style={{ fontStyle: "oblique 70deg" }}
                    className="m-0 d-flex justify-content-start text-muted"
                  >
                    <small>@{chat.username}</small>
                  </p>
                  <p
                    style={{ backgroundColor: "#1F6C98" }}
                    className="small p-2 mw-3 mb-1 text-white rounded-1"
                  >
                    {chat.body}
                  </p>
                </div>
              </div>
            )
          )}
        </Card.Body>
        <Card.Footer
          style={{ background: "white" }}
          className="text-muted d-flex justify-content-start align-items-center p-1"
        >
          <input
            style={{ border: 0 }}
            type="text"
            className="form-control "
            placeholder="Type message"
          ></input>
          <a className="ms-3" href="#!">
            <FontAwesomeIcon
              style={{ color: "#1F6C98" }}
              icon={faPaperPlane}
              className="fa-lg"
            />
          </a>
        </Card.Footer>
      </Card>
    </>
  );
}

export default Chat;
