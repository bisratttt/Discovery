import React, { useEffect } from "react";
import { Col, ListGroup, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
function TweetButton() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      className="twitter-share-button"
      data-size="large"
      data-text="Did you #DISCover today&#39;s song of the day?"
      data-url="https://disc-music.com"
      data-show-count="false"
      target="_blank"
      rel="noopener noreferrer"
    ></a>
  );
}
function ShareModal(props) {
  const shareLinks = [
    {
      link: props.shareLink,
      buttonIcon: faInstagram,
      label: "Share on Instagram",
    },
    {
      link: props.shareLink,
      buttonIcon: faFacebook,
      label: "Share on Facebook",
    },
    {
      link: `https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&text=Did%20you%20%23DISCover%20today%27s%20song%20of%20the%20day%3F&url=https%3A%2F%2Fdisc-music.com`,
      buttonIcon: faTwitter,
      label: "Share on Twitter",
    },
    {
      link: props.shareLink,
      buttonIcon: faTiktok,
      label: "Share on TikTok",
    },
    {
      link: props.shareLink,
      buttonIcon: faCopy,
      label: "Copy Link",
    },
  ];
  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      className="transparent-modal"
      centered
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        style={{
          backgroundColor: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(2.5rem)",
          WebkitBackdropFilter: "blur(2.5rem)",
        }}
      >
        <Modal.Title className="text-white w-100">Share</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(2.5rem)",
          WebkitBackdropFilter: "blur(2.5rem)",
        }}
      >
        <ListGroup className="bg-transparent border-0 rounded-0">
          {shareLinks.map((shareLink) => (
            <ListGroup.Item className="border-0 share-button rounded-3">
              <a
                href={shareLink.link}
                className="text-white text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Row>
                  <Col xs={2}>
                    <FontAwesomeIcon icon={shareLink.buttonIcon} size="2xl" />
                  </Col>
                  <Col>
                    <span style={{ fontSize: "clamp(1rem, 5vw, 1.5rem)" }}>
                      {shareLink.label}
                    </span>
                  </Col>
                </Row>
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

ShareModal.propTypes = {
  shareLink: PropTypes.string,
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default ShareModal;
