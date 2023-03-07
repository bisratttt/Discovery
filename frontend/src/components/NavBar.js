import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { useState, useEffect } from "react";

function NavBar() {
  const [scrollY, setScrollY] = useState(0);
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowComponent(scrollY < 200); // remove component when user has scrolled down 500 pixels
  }, [scrollY]);

  return (
    <>
      {showComponent && (
        <Navbar
          expand="lg"
          style={{
            background: "transparent",
            position: "fixed",
            top: 0,
            zIndex: 888,
            width: !showComponent ? "auto" : "100%",
          }}
        >
          <Container fluid>
            <Navbar.Brand>
              <Image
                src="/Logo.png"
                width={50}
                className="d-inline-block align-top"
                alt="Discovery logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link
                  style={{
                    color: "rgb(111, 27, 6)",
                    fontWeight: "bold",
                    fontSize: "1.5em",
                  }}
                  href="#"
                >
                  What is this?
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default NavBar;
