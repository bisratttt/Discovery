import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { useMediaQuery } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useToggleComponents } from "../contexts/ToggleComponents";

export default function NavBarBottom() {
  const isSmallScreen = useMediaQuery("(max-width:765px)");
  const {
    setOpenReview,
    setOpenSongSubmissionList,
    setOpenSongInfo,
    setOpenProfile,
    setOnlyOneStateTrue,
  } = useToggleComponents();
  return (
    <Navbar
      bg="transparent"
      style={{ zIndex: 8 }}
      className="py-0 my-0"
      fixed={isSmallScreen ? "bottom" : undefined}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {!isSmallScreen ? (
          <Nav className="py-0 mb-0">
            <Nav.Link
              className="py-0"
              as={NavLink}
              style={{ color: "rgba(120,120,120,1)" }}
              to="/terms"
              activeClassName="active"
            >
              Terms
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              style={{ color: "rgba(120,120,120,1)" }}
              className="py-0"
              to="/cookies"
              activeClassName="active"
            >
              Cookies
            </Nav.Link>
          </Nav>
        ) : (
          <Nav
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            className="mx-0 w-100 d-flex justify-content-around rounded-top"
          >
            <Nav.Item className="d-flex justify-content-center align-content-center">
              <Nav.Link
                onClick={() => setOnlyOneStateTrue(setOpenSongSubmissionList)}
              >
                <PeopleOutlineIcon
                  className="pt-2 text-white"
                  sx={{ fontSize: 35 }}
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="d-flex justify-content-center align-content-center">
              <Nav.Link onClick={() => setOnlyOneStateTrue(setOpenSongInfo)}>
                <InfoOutlinedIcon
                  className="pt-2 text-white"
                  sx={{ fontSize: 35 }}
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="d-flex justify-content-center align-content-center">
              <Nav.Link
                onClick={() => {
                  setOpenReview(false);
                  setOpenSongInfo({ openInfo: false });
                  setOpenProfile(false);
                  setOpenSongSubmissionList(false);
                }}
              >
                <Image height={40} src="/Logo.webp" alt="Logo" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="d-flex justify-content-center align-content-center">
              <Nav.Link onClick={() => setOnlyOneStateTrue(setOpenReview)}>
                <StarBorderOutlinedIcon
                  className="pt-2 text-white"
                  sx={{ fontSize: 35 }}
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="d-flex justify-content-center align-content-center">
              <Nav.Link onClick={() => setOnlyOneStateTrue(setOpenProfile)}>
                <AccountCircleOutlinedIcon
                  className="pt-2 text-white"
                  sx={{ fontSize: 35 }}
                />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
