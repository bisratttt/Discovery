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

import { useToggleComponents } from "../contexts/ToggleComponents";
import {
  ADD_PREFERENCES,
  GET_USER_PREFERENCES_ID,
  UPDATE_USER_PREFERENCES,
} from "../queries/UserPreferencesQuery";
import { useMutation, useQuery } from "@apollo/client";
import { BSON } from "realm-web";
import { getPlatformIcon } from "../utils/utils";
import DeleteAccountWarningModal from "./DeleteAccountWarningModal";

export default function ProfileCard() {
  const [editMode, setEditMode] = useState(false);
  const { currentUser } = useRealmApp();
  const { setOpenProfile, setOnlyOneStateTrue } = useToggleComponents();
  const [socialHandles, setSocialHandles] = useState({
    youtube: null,
    instagram: null,
    facebook: null,
    tiktok: null,
    twitter: null,
    soundcloud: null,
    apple_music: null,
    spotify: null,
  });
  const [bio, setBio] = useState("");
  const [showDeleteWarningModal, setShowDeleteWarningModal] = useState(false);

  const { loading: queryLoading, data: queryData } = useQuery(
    GET_USER_PREFERENCES_ID,
    {
      variables: { user_id: new BSON.ObjectId(currentUser.id) },
      onCompleted: (queryData) => {
        setSocialHandles({
          youtube: queryData.userPreference.youtube_handle,
          instagram: queryData.userPreference.instagram_handle,
          facebook: queryData.userPreference.facebook_handle,
          tiktok: queryData.userPreference.tiktok_handle,
          twitter: queryData.userPreference.twitter_handle,
          apple_music: queryData.userPrefrence.applemusic_handle,
          spotify: queryData.userPrefrence.spotify_handle,
          soundcloud: queryData.userPrefrence.soundcloud_handle,
        });
        setBio(queryData.userPreference.bio);
      },
      onError: (err) => console.log("Error querying user preferences: ", err),
    }
  );
  const [addPreferences] = useMutation(ADD_PREFERENCES);
  const [updatePreferences, { loading: updateLoading }] = useMutation(
    UPDATE_USER_PREFERENCES
  );
  //   if user prefernces are not create then create them

  useEffect(() => {
    const addNewPreferences = async () => {
      if (!queryLoading && queryData === undefined) {
        try {
          await addPreferences({
            variables: {
              user_id: currentUser.id,
              username: currentUser.profile.email,
            },
            onCompleted: (addData) => {
              setSocialHandles({
                youtube: addData.userPreference.youtube_handle,
                instagram: addData.userPreference.instagram_handle,
                facebook: addData.userPreference.facebook_handle,
                tiktok: addData.userPreference.tiktok_handle,
                twitter: addData.userPreference.twitter_handle,
                apple_music: addData.userPrefrence.applemusic_handle,
                spotify: addData.userPrefrence.spotify_handle,
                soundcloud: addData.userPrefrence.soundcloud_handle,
              });
              setBio(addData.userPreference.bio);
            },
            onError: (err) =>
              console.error("Error adding new preference: ", err),
          });
        } catch (err) {
          console.error("Error adding preferences:", err);
        }
      }
    };

    addNewPreferences();
  }, [queryLoading, addPreferences, currentUser.id]);

  const handleChange = (e) => {
    setSocialHandles({ ...socialHandles, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //  update preferences
    updatePreferences({
      variables: {
        user_id: currentUser.id,
        youtube: socialHandles.youtube,
        instagram: socialHandles.instagram,
        facebook: socialHandles.facebook,
        twitter: socialHandles.twitter,
        tiktok: socialHandles.tiktok,
        apple_music: socialHandles.apple_music,
        spotify: socialHandles.spotify,
        soundcloud: socialHandles.soundcloud,
        bio: bio,
      },
      onCompleted: (updateData) => {
        setEditMode(false);
        setSocialHandles({
          youtube: updateData.userPreference.youtube_handle,
          instagram: updateData.userPreference.instagram_handle,
          facebook: updateData.userPreference.facebook_handle,
          tiktok: updateData.userPreference.tiktok_handle,
          twitter: updateData.userPreference.twitter_handle,
          apple_music: updateData.userPrefrence.applemusic_handle,
          spotify: updateData.userPrefrence.spotify_handle,
          soundcloud: updateData.userPrefrence.soundcloud_handle,
        });
        setBio(updateData.userPreference.bio);
      },
      onError: (err) => console.error("Error updating preferences: ", err),
    });
  };
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
            onClick={() => setOnlyOneStateTrue(setOpenProfile)}
          >
            <FontAwesomeIcon size="lg" icon={faXmark} />
          </Button>
          <Card.Title>Profile Settings</Card.Title>
        </Card.Header>
        <Card.Body className="px-2">
          <Row>
            <Col
              xs={9}
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
            <Col xs={3}>
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
          <Row style={{ margin: "0 0.1rem 0" }}>
            {/* bio */}
            <Row className="mt-2">
              <Col className="d-flex justify-content-start">
                <span style={{ fontWeight: "bold" }}>BIO</span>
              </Col>
            </Row>
            <Row className="darker-container rounded-3 mb-3 py-1 mx-0 px-0 text-white">
              <Col>
                {!editMode ? (
                  <p className="mb-0 text-start">{bio}</p>
                ) : (
                  <Form.Control
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    as="textarea"
                    placeholder="your bio"
                    className="bg-transparent border-0 text-white"
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-start">
                <span style={{ fontWeight: "bold" }}>SOCIALS</span>
              </Col>
            </Row>
            <Row className="py-1 mx-0 px-0 darker-container rounded-3">
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
                        platform === "apple_music" ? (
                          <a
                            href={`https://music.apple.com/profile/${socialHandles[platform]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="form-control d-flex justify-content-between align-items-center bg-transparent border-0 text-white"
                          >
                            {socialHandles[platform]
                              ? socialHandles[platform]
                              : "your-handle"}
                          </a>
                        ) : platform === "spotify" ? (
                          <a
                            href={`https://open.spotify.com/user/${socialHandles[platform]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="form-control d-flex justify-content-between align-items-center bg-transparent border-0 text-white"
                          >
                            {socialHandles[platform]
                              ? socialHandles[platform]
                              : "your-handle"}
                          </a>
                        ) : (
                          <a
                            href={`https://${platform}.com/${
                              (platform === "youtube" ||
                                platform === "tiktok") &&
                              socialHandles[platform]
                                ? "@"
                                : ""
                            }${socialHandles[platform] ?? ""}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="form-control d-flex justify-content-between align-items-center bg-transparent border-0 text-white"
                          >
                            {socialHandles[platform]
                              ? `${
                                  platform === "youtube" ||
                                  platform === "tiktok"
                                    ? "@"
                                    : ""
                                }${socialHandles[platform]}`
                              : `your-handle`}
                          </a>
                        )
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
            <Row className="px-0 mx-0 mt-3">
              <Col xs={12} className="darker-container px-0 mx-0">
                <Button
                  className="w-100 bg-transparent"
                  style={{ borderColor: "maroon" }}
                  onClick={() => setShowDeleteWarningModal(true)}
                >
                  Delete Account
                </Button>
              </Col>
            </Row>
          </Row>
          <DeleteAccountWarningModal
            onHide={() => setShowDeleteWarningModal(false)}
            show={showDeleteWarningModal}
          />
        </Card.Body>
      </Card>
    </>
  );
}
