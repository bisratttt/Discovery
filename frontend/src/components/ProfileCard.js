import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import {
  Card,
  Col,
  Row,
  Button,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useRealmApp } from "../contexts/RealmApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPencilAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faYoutube,
  faInstagram,
  faFacebook,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useToggleComponents } from "../contexts/ToggleComponents";
import {
  ADD_PREFERENCES,
  GET_USER_PREFERENCES,
  UPDATE_USER_PREFERENCES,
} from "../queries/UserPreferencesQuery";
import { useMutation, useQuery } from "@apollo/client";
import { BSON } from "realm-web";

const getPlatformIcon = (platform) => {
  switch (platform) {
    case "youtube":
      return faYoutube;
    case "instagram":
      return faInstagram;
    case "facebook":
      return faFacebook;
    case "tiktok":
      return faTiktok;
    case "twitter":
      return faTwitter;
    default:
      return null;
  }
};
export default function ProfileCard() {
  const { currentUser } = useRealmApp();
  const { setOpenProfile } = useToggleComponents();
  const [socialHandles, setSocialHandles] = useState({
    youtube: null,
    instagram: null,
    facebook: null,
    tiktok: null,
    twitter: null,
  });
  const {
    loading: queryLoading,
    error: queryError,
    data,
  } = useQuery(GET_USER_PREFERENCES, {
    variables: { user_id: new BSON.ObjectId(currentUser.id) },
    onCompleted: () => {
      console.log("Complete fetching...");
      setSocialHandles({
        youtube: data.userPreference.youtube_handle,
        instagram: data.userPreference.instagram_handle,
        facebook: data.userPreference.facebook_handle,
        tiktok: data.userPreference.tiktok_handle,
        twitter: data.userPreference.twitter_handle,
      });
    },
  });
  const [addPreferences, { error: addError, data: addData }] =
    useMutation(ADD_PREFERENCES);
  const [updatePreferences, { error: updateError, loading: updateLoading }] =
    useMutation(UPDATE_USER_PREFERENCES);
  //   if user prefernces are not create then create them

  useEffect(() => {
    const addNewPreferences = async () => {
      if (!queryLoading && data === undefined) {
        try {
          await addPreferences({
            variables: { user_id: currentUser.id },
            onCompleted: () =>
              setSocialHandles({
                youtube: addData.userPreference.youtube_handle,
                instagram: addData.userPreference.instagram_handle,
                facebook: addData.userPreference.facebook_handle,
                tiktok: addData.userPreference.tiktok_handle,
                twitter: addData.userPreference.twitter_handle,
              }),
          });
        } catch (err) {
          console.error("Error adding preferences:", err);
        }
      }
    };

    addNewPreferences();
  }, [queryLoading, data, addPreferences, currentUser.id]);

  const handleChange = (e) => {
    setSocialHandles({ ...socialHandles, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //  update preferences
    updatePreferences({
      variables: {
        user_id: currentUser.id,
        youtube: socialHandles.youtube ?? "",
        instagram: socialHandles.instagram ?? "",
        facebook: socialHandles.facebook ?? "",
        twitter: socialHandles.twitter ?? "",
        tiktok: socialHandles.tiktok ?? "",
      },
      onCompleted: () => setEditMode(false),
    });
  };
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      {queryLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Card className="bg-transparent text-white border-0">
        <Card.Header>
          <Button
            className="bg-transparent border-0 position-absolute start-0 top-0"
            onClick={() => setOpenProfile(false)}
          >
            <FontAwesomeIcon size="lg" icon={faXmark} />
          </Button>
          <Card.Title>Profile Settings</Card.Title>
        </Card.Header>
        <Card.Body className="px-2">
          <Row>
            <Col
              xs={10}
              className="d-flex justify-content-start align-items-center"
            >
              <Avatar
                name={currentUser.profile.email}
                round
                size="32"
                textSizeRatio={2}
                className="me-2"
              />
              <span
                style={{
                  fontSize: "clamp(1.2rem, 5vw, 1.6rem)",
                  fontWeight: "600",
                }}
                className="h-100 d-flex justify-content-center align-items-center"
              >
                {currentUser.profile.email}
              </span>
            </Col>
            <Col xs={2}>
              {" "}
              <Button
                className="bg-transparent border-1 border-white"
                onClick={() => setEditMode((edit) => !edit)}
              >
                <FontAwesomeIcon icon={editMode ? faXmark : faPencilAlt} />
              </Button>
            </Col>
          </Row>
          {/* user preferences */}
          <Row
            className="darker-container rounded-3 mt-2"
            style={{ margin: "0 0.1rem 0" }}
          >
            {/* bio */}
            <Row>
              <Col></Col>
            </Row>
            <Row className="mt-1 py-1 mx-0 px-0">
              <Col>
                <Form onSubmit={handleSubmit}>
                  {Object.keys(socialHandles).map((platform) => (
                    <InputGroup key={platform} className="mb-3 ">
                      <InputGroup.Text
                        className="bg-transparent d-flex justify-content-center align-items-center border-0"
                        style={{ width: "40px" }}
                      >
                        <FontAwesomeIcon
                          size="lg"
                          icon={getPlatformIcon(platform)}
                          className="text-white"
                        />
                      </InputGroup.Text>
                      {!editMode ? (
                        <a
                          href={`https://${platform}.com/${
                            socialHandles[platform] ?? ""
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="form-control d-flex justify-content-between align-items-center bg-transparent border-0 text-white"
                        >
                          {" "}
                          {socialHandles[platform]
                            ? socialHandles[platform].split("://")[1]
                            : `your-handle`}
                        </a>
                      ) : (
                        <Form.Control
                          type="text"
                          placeholder={`your-handle`}
                          name={platform}
                          value={socialHandles[platform] ?? ""}
                          onChange={handleChange}
                          readOnly={!editMode}
                          className="bg-transparent border-0 text-white"
                        />
                      )}
                    </InputGroup>
                  ))}
                  {editMode && (
                    <div className="text-end border-top-translucent">
                      <Button
                        className="bg-transparent border-1 border-white my-2"
                        type="submit"
                        disabled={updateLoading}
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </Form>
              </Col>
            </Row>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
