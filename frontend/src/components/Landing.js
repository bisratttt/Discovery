import {
  Container,
  Image,
  Row,
  Form,
  Col,
  Button,
  InputGroup,
} from "react-bootstrap";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar";
import * as Realm from "realm-web";
import { useRealmApp } from "./RealmApp";
import { handleAuthenticationError } from "../hooks/handleAuthError";
import React, { useState } from "react";

function LandingDetails() {
  const isSmallScreen = useMediaQuery("(max-width:950px)");
  const componentSize = isSmallScreen ? "sm" : "lg";
  const inputCenter = isSmallScreen ? "0" : "40px";
  const realmApp = useRealmApp();
  const [usernameValue, setUsernameValue] = useState("");

  function handleInputChange(event) {
    setUsernameValue(event.target.value);
  }

  const noErrors = {
    username: null,
  };
  const [error, setError] = React.useState(noErrors);
  const clearErrors = () => setError(noErrors);
  const onFormSubmit = async () => {
    clearErrors();
    try {
      await realmApp.logIn(Realm.Credentials.anonymous());
    } catch (err) {
      handleAuthenticationError(err, setError);
    }
  };
  return (
    <Container
      fluid
      className="landing fullscreen d-flex flex-column justify-content-center align-items-center"
    >
      <Row className="w-100 justify-content-center align-items-center">
        <Col sm={12} md={6}>
          <Image src="/LogoName.svg" className="w-100 h-auto" />
        </Col>
      </Row>
      <Row className="w-100 justify-content-center align-items-start">
        <Col
          xs={12}
          className="d-flex justify-content-center"
          style={{ marginLeft: inputCenter }}
        >
          <Form
            className="col-sm-12 col-md-6"
            onSubmit={(e) => {
              e.preventDefault();
              onFormSubmit();
            }}
          >
            <Row>
              <Col className="d-flex justify-content-start">
                <InputGroup className="mb-2" size={componentSize}>
                  <InputGroup.Text>@</InputGroup.Text>
                  <Form.Control
                    required
                    value={usernameValue}
                    onChange={handleInputChange}
                    size={componentSize}
                    name="username"
                    placeholder="what is your username?"
                    className="col-sm-12 col-md-6"
                    isValid={Boolean(error.username)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Username is taken! Please choose another one
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
              <Col
                xs={12}
                sm={3}
                className={`d-flex justify-content-${
                  isSmallScreen ? "center" : "start"
                } mb-2`}
              >
                <Button size={componentSize} variant="dark" type="submit">
                  <FontAwesomeIcon icon={faVolumeHigh} /> Tune In
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default function Landing() {
  return <LandingDetails />;
}
