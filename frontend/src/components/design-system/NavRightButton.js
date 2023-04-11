import { useMediaQuery } from "@mui/material";
import React from "react";
import { Button, Nav, NavDropdown } from "react-bootstrap";
export function NavDropdownLink({ onClick, label }) {
  return (
    <NavDropdown.Item className="ps-0 py-2">
      <Nav.Link
        style={{
          fontSize: "clamp(0.8rem,2vw,1rem)",
          fontWeight: "bold",
        }}
        className="mt-0 mb-0 pt-0 pb-0 text-white"
        href="#"
        onClick={onClick}
      >
        {label}
      </Nav.Link>
    </NavDropdown.Item>
  );
}
export function NavRightButton({
  onClick = () => {},
  MuiButtonIcon,
  name,
  fullname = false,
}) {
  const isSmallScreen = useMediaQuery("(max-width:850px)");

  return (
    <Button
      size={isSmallScreen ? "sm" : "lg"}
      className={`text-white text-decoration-none rounded-pill me-3 d-flex align-items-center justify-content-center ${
        isSmallScreen ? "px-3 border-0" : ""
      } ${fullname ? "py-3" : ""}`}
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        borderColor: "rgba(255,255,255,0.6)",
      }}
      onClick={onClick}
    >
      {MuiButtonIcon && (
        <MuiButtonIcon className={`p-0 ${!isSmallScreen && "me-2"}`} />
      )}
      {(!isSmallScreen || fullname) && name}
    </Button>
  );
}
