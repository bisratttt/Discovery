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
import {
  faEyeSlash,
  faVolumeHigh,
  faEye,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import * as Realm from "realm-web";
import { useRealmApp } from "../contexts/RealmApp";
import { handleAuthenticationError } from "../hooks/handleAuthError";
import React, { useState } from "react";
import { useErrorAlert } from "../hooks/useErrorAlert";

function LandingDetails() {
  const isSmallScreen = useMediaQuery("(max-width:950px)");
  const isPhoneScreen = useMediaQuery("(max-width:630px");
  const componentSize = isPhoneScreen ? "sm" : "lg";
  const inputPadding = !isSmallScreen ? "7em" : "0";
  const realmApp = useRealmApp();
  // initial configuration to Auth errors
  const noErrors = {
    username: null,
    password: null,
    other: null,
  };
  const [error, setError] = useState(noErrors);
  const [showPass, setShowPass] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const clearErrors = () => setError(noErrors);
  const NonAuthErrorAlert = useErrorAlert({
    error: error.other,
    clearError: () => {
      setError((prevError) => ({ ...prevError, other: null }));
    },
  });
  const onFormSubmit = async ({ email, password }) => {
    clearErrors();
    try {
      setIsLoadingUser(true);
      await realmApp.logIn(Realm.Credentials.emailPassword(email, password));
    } catch (err) {
      try {
        await realmApp.emailPasswordAuth.registerUser({ email, password });
      } catch (err) {
        handleAuthenticationError(err, setError);
      }
    } finally {
      setIsLoadingUser(false);
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
        <Col xs={12} className="d-flex justify-content-center">
          <Form
            className="col-sm-12 col-md-6"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const { username, password } = Object.fromEntries(
                formData.entries()
              );
              onFormSubmit({ email: username, password: password });
            }}
          >
            <Row
              style={{ paddingLeft: inputPadding, paddingRight: inputPadding }}
            >
              <Col xs={12} className="d-flex justify-content-start">
                {/* username */}
                <InputGroup className="mb-2" size={componentSize}>
                  <Form.Control
                    required
                    size={componentSize}
                    name="username"
                    placeholder="what is your username?"
                    className="col-sm-12 col-md-6 rounded-2"
                    isInvalid={Boolean(error.username)}
                    style={{ border: 0 }}
                    disabled={isLoadingUser ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.username}
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
              <Col xs={12}>
                <InputGroup className="mb-2" size={componentSize}>
                  <Form.Control
                    required
                    size={componentSize}
                    name="password"
                    placeholder="password"
                    className="col-sm-12 col-md-6 b-0"
                    isInvalid={Boolean(error.password)}
                    style={{ border: 0 }}
                    type={showPass ? "text" : "password"}
                    disabled={isLoadingUser ? true : false}
                  />
                  {/* for password... */}
                  <InputGroup.Text
                    className="rounded-2"
                    style={{ border: 0, backgroundColor: "white" }}
                  >
                    <FontAwesomeIcon
                      onClick={() => setShowPass(!showPass)}
                      icon={!showPass ? faEyeSlash : faEye}
                    />
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    {error.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
              <Col
                xs={12}
                className={`d-flex justify-content-center
                } mb-2`}
              >
                <Button
                  size={componentSize}
                  variant="dark"
                  type="submit"
                  disabled={isLoadingUser ? true : false}
                >
                  {isLoadingUser && (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin={isLoadingUser ? true : false}
                    />
                  )}
                  <FontAwesomeIcon icon={faVolumeHigh} /> Tune In
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <NonAuthErrorAlert />
    </Container>
  );
}

export default function Landing() {
  return <LandingDetails />;
}
