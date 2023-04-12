import {
  Modal,
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
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import * as Realm from "realm-web";
import { useRealmApp } from "../contexts/RealmApp";
import { handleAuthenticationError } from "../hooks/handleError";
import React, { useState } from "react";
import { useErrorAlert } from "../hooks/useErrorAlert";
import { useToggleComponents } from "../contexts/ToggleComponents";

export default function LoginModal() {
  const isPhoneScreen = useMediaQuery("(max-width:630px");
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [registerUser, setRegisterUser] = useState(false);
  const componentSize = isSmallScreen ? "sm" : "lg";
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
  const { openLoginModal, setOpenLoginModal } = useToggleComponents();
  const NonAuthErrorAlert = useErrorAlert({
    error: error.other,
    clearError: () => {
      setError((prevError) => ({ ...prevError, other: null }));
    },
  });
  const onFormSubmit = async ({ email, password }) => {
    clearErrors();
    setIsLoadingUser(true);
    if (registerUser) {
      try {
        await realmApp.emailPasswordAuth.registerUser({ email, password });
      } catch (err) {
        handleAuthenticationError(err, setError);
      }
    }
    // login user
    try {
      await realmApp.logIn(Realm.Credentials.emailPassword(email, password));
      setOpenLoginModal(false);
    } catch (err) {
      handleAuthenticationError(err, setError);
    }
    setIsLoadingUser(false);
  };

  return (
    <Modal
      onHide={() => setOpenLoginModal(false)}
      show={openLoginModal}
      centered
      animation={false}
      className="px-2"
    >
      <Modal.Body className=" theme-bg-color rounded-3 pt-1 pb-4">
        <Row className="justify-content-end">
          <Col xs={2} md={1} className="pe-0 d-flex justify-content-end">
            <Button
              className="border-0 bg-transparent"
              onClick={() => setOpenLoginModal(false)}
            >
              <FontAwesomeIcon color="black" size="xl" icon={faXmark} />
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={11}>
            <Row>
              <Col>
                <Image
                  alt="logo-with-name"
                  src="/LogoName.png"
                  className="w-100 h-auto"
                />
              </Col>
            </Row>
            <Row className="pb-2">
              <Col className="d-flex justify-content-center">
                <span
                  style={{
                    fontSize: "clamp(0.9rem, 4vw, 1.1rem)",
                    fontWeight: "500",
                  }}
                >
                  {registerUser
                    ? "Sign up for an account to interact"
                    : "Please enter your details to interact"}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const { username, password } = Object.fromEntries(
                      formData.entries()
                    );
                    onFormSubmit({ email: username, password: password });
                  }}
                >
                  <Row>
                    <Col>
                      {/* username */}
                      <InputGroup className="mb-2" size={componentSize}>
                        <Form.Control
                          required
                          size={componentSize}
                          name="username"
                          placeholder={
                            registerUser ? "username" : "what is your username?"
                          }
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
                  </Row>
                  <Row>
                    <Col>
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
                  </Row>
                  <Row>
                    <Col
                      xs={12}
                      className="w-100 d-flex justify-content-center"
                    >
                      <Button
                        size={componentSize}
                        className="border-0 w-100 theme-button-color "
                        type="submit"
                        disabled={isLoadingUser ? true : false}
                      >
                        {isLoadingUser && (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin={isLoadingUser ? true : false}
                            className="pe-2"
                          />
                        )}
                        <FontAwesomeIcon icon={faVolumeHigh} className="pe-2" />
                        {registerUser ? (
                          <span>Sign Up</span>
                        ) : (
                          <span>Tune In</span>
                        )}
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-center pt-2">
                      {registerUser ? (
                        <span>
                          Already have an account?{" "}
                          <a
                            className="modal-link text-decoration-underline"
                            onClick={() => setRegisterUser(false)}
                            style={{ cursor: "pointer" }}
                          >
                            Log in
                          </a>
                        </span>
                      ) : (
                        <span>
                          Don't have an account?{" "}
                          <a
                            className="modal-link text-decoration-underline"
                            onClick={() => setRegisterUser(true)}
                            style={{ cursor: "pointer" }}
                          >
                            Create account
                          </a>
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <NonAuthErrorAlert />
      </Modal.Body>
    </Modal>
  );
}
