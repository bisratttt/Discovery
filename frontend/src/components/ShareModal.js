import React, { useEffect, useState } from "react";
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
import { Alert } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

async function copyPageUrl(event) {
  event.preventDefault(); // Prevents the default behavior of the anchor tag
  try {
    await navigator.clipboard.writeText(window.location.href);
    console.log("Page URL copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

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
  const [copied, setCopied] = useState(false);
  const shareLinks = [
    {
      link: props.shareLink,
      buttonIcon: faInstagram,
      label: "Share on Instagram",
      onClick: async (event, setCopied = null) => {},
    },
    {
      link: props.shareLink,
      buttonIcon: faFacebook,
      label: "Share on Facebook",
      onClick: async (event, setCopied = null) => {},
    },
    {
      link: `https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&text=Did%20you%20%23DISCover%20today%27s%20song%20of%20the%20day%3F&url=https%3A%2F%2Fdisc-music.com`,
      buttonIcon: faTwitter,
      label: "Share on Twitter",
      onClick: async (event, setCopied = null) => {},
    },
    {
      link: props.shareLink,
      buttonIcon: faTiktok,
      label: "Share on TikTok",
      onClick: async (event, setCopied = null) => {},
    },
    {
      link: props.shareLink,
      buttonIcon: faCopy,
      label: "Copy Link",
      onClick: async (event, setCopied = null) => {
        await copyPageUrl(event);
        setCopied(true);
      },
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
                onClick={(event) => shareLink.onClick(event, setCopied)}
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
          {copied && (
            <Alert
              variant="outlined"
              iconMapping={{
                success: <CheckCircleOutlineOutlinedIcon fontSize="inherit" />,
              }}
              onClose={() => setCopied(false)}
              sx={{ color: "#ffffff" }}
            >
              Link has been copied!
            </Alert>
          )}
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
