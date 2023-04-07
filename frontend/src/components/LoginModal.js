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
} from "@fortawesome/free-solid-svg-icons";
import * as Realm from "realm-web";
import { useRealmApp } from "../contexts/RealmApp";
import { handleAuthenticationError } from "../hooks/handleError";
import React, { useState } from "react";
import { useErrorAlert } from "../hooks/useErrorAlert";
import { useToggleComponents } from "../contexts/ToggleComponents";

export default function LoginModal() {
  const isPhoneScreen = useMediaQuery("(max-width:630px");
  const componentSize = isPhoneScreen ? "sm" : "lg";
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
    try {
      setIsLoadingUser(true);
      await realmApp.logIn(Realm.Credentials.emailPassword(email, password));
      setOpenLoginModal(false);
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
    <Modal
      onHide={() => setOpenLoginModal(false)}
      show={openLoginModal}
      size="lg"
      centered
      animation={false}
    >
      <Modal.Header
        closeButton
        className="px-4 theme-bg-color border-0 rounded-3"
      >
        <Modal.Title className="text-center ms-auto">
          Login to interact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="theme-bg-color rounded-3">
        <Row className="w-100 justify-content-center align-items-center">
          <Col sm={12} md={6}>
            <Image
              alt="logo-with-name"
              src="/LogoName.png"
              className="w-100 h-auto"
            />
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
              <Row>
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
      </Modal.Body>
    </Modal>
  );
}
