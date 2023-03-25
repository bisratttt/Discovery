import {
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useRealmApp } from "../contexts/RealmApp";
import InfoModal from "./InfoModal";
import Avatar from "react-avatar";
import { useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import RadarIcon from "@mui/icons-material/Radar";

const PillAvatar = ({ email, isSmallScreen }) => {
  const avatarSize = isSmallScreen ? 30 : 40;

  const [jumping, setJumping] = useState(false);
  const handleJump = () => {
    setJumping(true);
    setTimeout(() => setJumping(false), 500);
  };
  return (
    <Row
      className="align-items-center justify-content-center"
      onClick={handleJump}
    >
      <Col>
        <Avatar name={email} round size={avatarSize} textSizeRatio={2} />
      </Col>
      {!isSmallScreen && (
        <Col className="d-flex justify-content-center align-items-center px-0">
          <p className="text-white mb-0">{email}</p>
        </Col>
      )}

      <Col className="pe-3">
        <FontAwesomeIcon
          icon={faAngleDown}
          style={{ color: "white" }}
          size={isSmallScreen ? "sm" : "lg"}
          bounce={jumping}
        />
      </Col>
    </Row>
  );
};

function NavBar({ showNav }) {
  const { currentUser, logOut } = useRealmApp();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:850px)");

  const customDropdownPill = React.forwardRef(({ children, onClick }, ref) => (
    <div // wrap the component inside a container with round borders and a down arrow icon
      className="d-flex align-items-center rounded-pill px-2 py-2"
      style={{ cursor: "pointer", backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClick}
    >
      {children}
    </div>
  ));

  return (
    <>
      <Navbar
        expand={true}
        style={{
          position: "fixed",
          top: 0,
          zIndex: 888,
          width: "100%",
        }}
      >
        <Container fluid className="justify-content-start align-items-start">
          {currentUser && showNav && (
            <Navbar.Brand className="m-0 p-0">
              <Image
                src="/Logo.png"
                width={50}
                className="d-inline-block align-top"
                alt="Discovery logo"
              />
            </Navbar.Brand>
          )}

          <Navbar.Collapse
            className={`justify-content-end mt-1 ${!isSmallScreen && "me-3"}`}
          >
            <Nav>
              {!currentUser && (
                <Nav.Link
                  style={{
                    color: "rgb(111, 27, 6)",
                    fontWeight: "bold",
                    fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)",
                  }}
                  onClick={() => setShowInfoModal(true)}
                  href="#"
                >
                  What is this?
                </Nav.Link>
              )}
              <InfoModal
                show={showInfoModal}
                onHide={() => setShowInfoModal(false)}
              />
              {currentUser && showNav && (
                <>
                  <Button
                    size={isSmallScreen ? "sm" : "lg"}
                    className="text-white text-decoration-none rounded-pill border-white me-3 py-0"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      padding: isSmallScreen
                        ? "0.8rem 0.9rem 0.8rem"
                        : "0.8rem 1rem 0.8rem",
                    }}
                  >
                    <RadarIcon className=" pb-1 me-2" />
                    {!isSmallScreen && "Discover from others"}
                  </Button>
                  <Dropdown align="end">
                    <Dropdown.Toggle as={customDropdownPill}>
                      <PillAvatar
                        email={currentUser.profile.email}
                        isSmallScreen={isSmallScreen}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      className="rounded-3 py-0"
                    >
                      <NavDropdown.Item className="ps-0 py-2">
                        <Nav.Link
                          style={{
                            fontSize: "clamp(0.8rem,2vw,1rem)",
                            fontWeight: "bold",
                          }}
                          className="mt-0 mb-0 pt-0 pb-0 text-white"
                          href="#"
                          onClick={async () => await logOut()}
                        >
                          Log Out
                        </Nav.Link>
                      </NavDropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
