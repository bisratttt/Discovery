import {
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRealmApp } from "../contexts/RealmApp";
import InfoModal from "./InfoModal";
import Avatar from "react-avatar";
import { useMediaQuery } from "@mui/material";

function NavBar({ showNav }) {
  const { currentUser, logOut } = useRealmApp();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const avatarSize = isSmallScreen ? 40 : 45;

  function SelfAvatar({ children, onClick }) {
    return (
      <a href="#" onClick={onClick}>
        <Avatar
          name={currentUser.profile.email}
          round
          size={avatarSize}
          textSizeRatio={2}
        />
      </a>
    );
  }
  return (
    <>
      <Navbar
        expand={true}
        style={{
          background: "transparent",
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

          <Navbar.Collapse className="justify-content-end mt-1">
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
                <Dropdown align="end">
                  <Dropdown.Toggle as={SelfAvatar} />
                  <Dropdown.Menu
                    style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                    className="rounded-1"
                  >
                    <NavDropdown.Item className="mt-0 pt-0 mb-0 pb-0 ps-0">
                      <Nav.Link
                        style={{
                          color: "black",
                          fontSize: "clamp(0.8rem,2vw,1rem)",
                          fontWeight: "bold",
                        }}
                        className="mt-0 mb-0 pt-0 pb-0"
                        href="#"
                        onClick={async () => await logOut()}
                      >
                        Log Out
                      </Nav.Link>
                    </NavDropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
