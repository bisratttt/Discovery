import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, ListGroup, Row, Button, Col } from "react-bootstrap";
import { useToggleComponents } from "../contexts/ToggleComponents";

const cookies = [
  {
    title: "What are cookies?",
    body: [
      {
        p: `Cookies are small text files that are stored on your device 
        (e.g., computer, smartphone, or tablet) when you visit or use certain online services, 
        such as websites or apps. They help to remember your preferences, authenticate your 
        session, and collect information about your interactions with the app.`,
      },
    ],
  },
  {
    title: "Types of cookies we use",
    body: [
      {
        p: `We use the following types of cookies in our app:`,
      },
      {
        list: [
          `Authentication Cookies: These cookies are used to authenticate user sessions and 
          ensure that only authorized users can access the app and its associated data. 
          They help us to maintain your login state and provide a secure user experience.`,
          `Session Cookies: Session cookies are temporary cookies that are stored on your 
          device during a browsing session. They are used to maintain user state and store 
          information about your activity within the app. These cookies are deleted when you 
          close the app or when your session expires.`,
          `Analytics Cookies: Analytics cookies are used to collect information about how 
          users interact with the app, such as which pages are visited most frequently or 
          how long users spend on each page. This information is used to improve the app's 
          performance and user experience. We may use third-party analytics providers such as 
          Google Analytics to help us with this process.`,
          `Third-Party Cookies: In some cases, third-party cookies may be used in 
          conjunction with MongoDB Atlas. For example, if the app integrates with a 
          third-party service such as Google Analytics or Facebook, cookies from those 
          services may be used to track user activity and provide additional functionality. 
          We also use third-party cookies from Spotify, YouTube, and Apple Music, as we have
           integrated their frameworks into our app.`,
        ],
      },
    ],
  },
  {
    title: "Managing cookies",
    body: [
      {
        p: `You can manage your cookie preferences through your device or browser settings. 
        Most browsers allow you to block or delete cookies, but doing so may impact the 
        functionality and performance of the app. Please note that if you choose to disable 
        cookies, you may not be able to access certain features or services within the app.`,
      },
      {
        p: `For more information on how to manage cookies, please visit the help pages of 
        your preferred browser or refer to the documentation provided by the third-party 
        services we use.`,
      },
    ],
  },
  {
    title: "Changes to this Cookie Policy",
    body: [
      {
        p: `We may update this Cookie Policy from time to time. Any changes will be 
        posted on this page, and we encourage you to review this policy periodically to 
        stay informed about our use of cookies.`,
      },
    ],
  },
  {
    title: "Contact us",
    body: [
      {
        p: `If you have any questions or concerns about this Cookie Policy or our use of 
        cookies, please contact us at: `,
      },
      {
        email: `discmusicinfo@gmail.com`,
      },
    ],
  },
];

export default function Cookies() {
  const { setOpenCookies } = useToggleComponents();
  return (
    <Container className="ms-0 terms w-100 theme-bg-color" fluid>
      <Row className="text-start">
        <Col xs={10}>
          <h1 className="ps-0 display-2 theme-text-color">Cookie Policy</h1>
          <h5 className="ps-0 mb-5">Last updated: March 30, 2023</h5>
          <hr
            style={{
              height: "0.06rem",
              backgroundColor: "rgb(111, 27, 6)",
              border: "none",
              opacity: 1,
            }}
          />
          <h3 className="ps-0 theme-text-color">Welcome to Discover!</h3>
          <p className="ps-0">
            This Cookie Policy explains how Discover ("we," "us," or "our") uses
            cookies and similar technologies when you visit or use our website,
            disc-music.com or discmusic.netlify.app. By using our app, you agree
            to the use of cookies as described in this policy. Please read this
            policy carefully to understand how we use cookies and your choices
            regarding cookies.
          </p>
          <ListGroup as="ol" className="border-0">
            {cookies.map((cookie, index) => (
              <ListGroup.Item
                as="li"
                className="d-flex border-0 theme-bg-color"
              >
                <span style={{ marginTop: "0.5rem" }}>{index + 1}.</span>
                <div className="ms-1">
                  <h3 style={{ color: "rgb(111, 27, 6)" }}>{cookie.title}</h3>
                  {cookie.body.map((b) => {
                    if (b.hasOwnProperty("p")) {
                      return <p className="ps-0">{b.p}</p>;
                    } else if (b.hasOwnProperty("list")) {
                      return (
                        <ol>
                          {b.list.map((item) => (
                            <li>{item}</li>
                          ))}
                        </ol>
                      );
                    } else if (b.hasOwnProperty("email")) {
                      return <a href={`mailto:${b.email}`}>{b.email}</a>;
                    }
                  })}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col style={{ borderLeft: "0.07rem solid rgb(111, 27, 6)" }}></Col>
      </Row>
    </Container>
  );
}
