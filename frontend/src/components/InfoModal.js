import { useMediaQuery } from "@mui/material";
import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
export default function InfoModal(props) {
  const isPhoneScreen = useMediaQuery("(max-width:630px");

  return (
    <Modal
      {...props}
      size="lg"
      centered
      scrollable
      className={`${isPhoneScreen && "pt-5 pb-5"}`}
    >
      <Modal.Header
        style={{
          backgroundColor: "#f0d9c2",
          border: "none",
          textAlign: "center",
        }}
      >
        <Container>
          <Modal.Title
            className="text-center"
            style={{
              color: "rgb(111, 27, 6)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              padding: 0,
            }}
          >
            Welcome to{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>Disc.</span>
          </Modal.Title>
        </Container>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#f0d9c2",
          paddingBottom: "0",
          paddingTop: "0",
        }}
      >
        <Container>
          <h3 style={{ color: "rgb(155, 54, 13)" }}>
            📻 Discover new music every day
          </h3>

          <p>
            We believe that every song has the power to inspire and connect
            people. That's why we're committed to bringing you the best music
            every day. 🎧 Our team of expert music curators carefully selects
            each track to ensure that it's high-quality and worth listening to.
          </p>

          <h3 style={{ color: "rgb(155, 54, 13)" }}>
            🗣️ Exchange thoughts with other music lovers
          </h3>
          <p>
            We know that discovering new music is more fun when you can share it
            with others. That's why we've built a community of music lovers
            where you can share your thoughts on each song and connect with
            others who share your musical taste. 🤝
          </p>

          <h3 style={{ color: "rgb(155, 54, 13)" }}>
            <img height={isPhoneScreen ? 20 : 30} src="earth.png" /> Build and
            discover communities
          </h3>
          <p>
            Our app is more than just a music discovery platform - it's a place
            where you can build and discover communities of music lovers just
            like you. Whether you're a die-hard fan of a particular artist or
            just love discovering new music, you'll find a community of
            like-minded people who share your passion. Our app makes it easy to
            connect with others, share your thoughts, and discover new music
            together. 🎉
          </p>

          <h3 style={{ color: "rgb(155, 54, 13)" }}>
            <img height={isPhoneScreen ? 20 : 30} src="idea.gif" /> Inspired by
            BeReal and Kiwi
          </h3>
          <p>
            We got the idea for Discover from two popular apps -{" "}
            <a
              href="https://bereal.com/en"
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link"
            >
              BeReal
            </a>
            , which lets you send photos to friends once a day at a random time,
            and{" "}
            <a
              href="https://www.wishroll.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link"
            >
              Kiwi
            </a>
            , which lets you discover music by sending songs to friends. We
            wanted to combine the best of both worlds - the excitement of
            discovering something new every day and the joy of sharing it with
            others.
          </p>
        </Container>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#f0d9c2",
          border: "none",
          marginTop: 0,
          paddingTop: 0,
        }}
      >
        <Container className="d-flex justify-content-center align-items-center">
          <Button
            style={{ backgroundColor: "#BA2D0B", border: "none" }}
            onClick={props.onHide}
            className="d-flex justify-content-center align-items-center ps-5 pe-5"
          >
            Close
          </Button>
        </Container>
      </Modal.Footer>
    </Modal>
  );
}
