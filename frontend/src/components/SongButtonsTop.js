import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Button } from "react-bootstrap";
import { useToggleComponents } from "../contexts/ToggleComponents";
import { useMediaQuery } from "@mui/material";

export default function SongButtonsTop({ setShareModal }) {
  const { setOpenSongInfo, setOnlyOneStateTrue } = useToggleComponents();
  const isSmallScreen = useMediaQuery("(max-width:850px)");

  return (
    <>
      {!isSmallScreen && (
        <Col className="d-flex justify-content-start">
          <Button
            style={{
              background: "transparent",
              borderColor: "transparent",
            }}
            onClick={() => setOnlyOneStateTrue(setOpenSongInfo)}
          >
            <FontAwesomeIcon icon={faCircleInfo} size="lg" />
          </Button>
        </Col>
      )}
      <Col className="d-flex justify-content-end">
        <Button
          style={{
            background: "transparent",
            borderColor: "transparent",
          }}
          className="ps-1"
          onClick={() => setShareModal(true)}
        >
          <FontAwesomeIcon icon={faShareFromSquare} size="lg" />
        </Button>
      </Col>
    </>
  );
}
