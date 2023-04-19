import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { useMediaQuery } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useToggleComponents } from "../contexts/ToggleComponents";
import { useRealmApp } from "../contexts/RealmApp";
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavBarBottom() {
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const {
    setOpenReview,
    setOpenSongSubmissionList,
    setOpenSongInfo,
    setOpenProfile,
    setOpenLoginModal,
    setOnlyOneStateTrue,
  } = useToggleComponents();

  const [
    { peopleClicked, infoClicked, starClicked, accountClicked },
    setNavClicked,
  ] = useState({
    peopleClicked: false,
    infoClicked: false,
    starClicked: false,
    accountClicked: false,
  });

  const { currentUser } = useRealmApp();
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
            style={{ backgroundColor: "rgba(20,20,20)", height: "10vh" }}
            className="mx-0 w-100 d-flex justify-content-around"
          >
            <Nav.Item className="d-flex justify-content-center align-content-center">
              <Nav.Link
                onClick={() => {
                  setNavClicked({
                    peopleClicked: true,
                    infoClicked: false,
                    starClicked: false,
                    accountClicked: false,
                  });
                  setOnlyOneStateTrue(setOpenSongSubmissionList);
                }}
              >
                {peopleClicked ? (
                  <PeopleIcon
                    className="pt-2 text-white"
                    sx={{ fontSize: 35 }}
                  />
                ) : (
                  <PeopleOutlineIcon
                    className="pt-2 text-white"
                    sx={{ fontSize: 35 }}
                  />
                )}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="d-flex justify-content-center align-content-center">
              <Nav.Link
                onClick={() => {
                  setNavClicked({
                    peopleClicked: false,
                    infoClicked: true,
                    starClicked: false,
                    accountClicked: false,
                  });
                  setOnlyOneStateTrue(setOpenSongInfo);
                }}
              >
                {infoClicked ? (
                  <InfoIcon className="pt-2 text-white" sx={{ fontSize: 35 }} />
                ) : (
                  <InfoOutlinedIcon
                    className="pt-2 text-white"
                    sx={{ fontSize: 35 }}
                  />
                )}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="d-flex justify-content-center align-content-center">
              <Nav.Link
                onClick={() => {
                  setNavClicked({
                    peopleClicked: false,
                    infoClicked: false,
                    starClicked: false,
                    accountClicked: false,
                  });
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
              <Nav.Link
                onClick={() => {
                  setNavClicked({
                    peopleClicked: false,
                    infoClicked: false,
                    starClicked: true,
                    accountClicked: false,
                  });
                  setOnlyOneStateTrue(setOpenReview);
                }}
              >
                {starClicked ? (
                  <StarIcon className="pt-2 text-white" sx={{ fontSize: 35 }} />
                ) : (
                  <StarBorderOutlinedIcon
                    className="pt-2 text-white"
                    sx={{ fontSize: 35 }}
                  />
                )}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="d-flex justify-content-center align-content-center">
              <Nav.Link
                onClick={() => {
                  if (currentUser.providerType === "local-userpass") {
                    setNavClicked({
                      peopleClicked: false,
                      infoClicked: false,
                      starClicked: false,
                      accountClicked: true,
                    });
                    setOnlyOneStateTrue(setOpenProfile);
                  } else {
                    setOpenLoginModal(true);
                  }
                }}
              >
                {accountClicked ? (
                  <AccountCircleIcon
                    className="pt-2 text-white"
                    sx={{ fontSize: 35 }}
                  />
                ) : (
                  <AccountCircleOutlinedIcon
                    className="pt-2 text-white"
                    sx={{ fontSize: 35 }}
                  />
                )}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
