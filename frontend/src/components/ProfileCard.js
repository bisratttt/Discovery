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
import { useMediaQuery } from "@mui/material";
import { BootstrapTooltip } from "./design-system/CustomMuiStyles";

export default function ProfileCard() {
  const [editMode, setEditMode] = useState(false);
  const { currentUser, logOut } = useRealmApp();
  const isSmallScreen = useMediaQuery("(max-width:850px)");
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
          apple_music: queryData.userPreference.applemusic_handle,
          spotify: queryData.userPreference.spotify_handle,
          soundcloud: queryData.userPreference.soundcloud_handle,
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
  //   if user prefernces are not created then create them

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
                youtube: addData.insertOneUserPreference.youtube_handle,
                instagram: addData.insertOneUserPreference.instagram_handle,
                facebook: addData.insertOneUserPreference.facebook_handle,
                tiktok: addData.insertOneUserPreference.tiktok_handle,
                twitter: addData.insertOneUserPreference.twitter_handle,
                apple_music: addData.insertOneUserPreference.applemusic_handle,
                spotify: addData.insertOneUserPreference.spotify_handle,
                soundcloud: addData.insertOneUserPreference.soundcloud_handle,
              });
              setBio(addData.insertOneUserPreference.bio);
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
          youtube: updateData.updateOneUserPreference.youtube_handle,
          instagram: updateData.updateOneUserPreference.instagram_handle,
          facebook: updateData.updateOneUserPreference.facebook_handle,
          tiktok: updateData.updateOneUserPreference.tiktok_handle,
          twitter: updateData.updateOneUserPreference.twitter_handle,
          apple_music: updateData.updateOneUserPreference.applemusic_handle,
          spotify: updateData.updateOneUserPreference.spotify_handle,
          soundcloud: updateData.updateOneUserPreference.soundcloud_handle,
        });
        setBio(updateData.updateOneUserPreference.bio);
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
        <Card.Header className="mt-3">
          {!isSmallScreen && (
            <Button
              className="bg-transparent border-0 position-absolute start-0 top-0"
              onClick={() => setOnlyOneStateTrue(setOpenProfile)}
            >
              <FontAwesomeIcon size="lg" icon={faXmark} />
            </Button>
          )}
          <Card.Title className={`${isSmallScreen && "text-start"}`}>
            Profile Settings
          </Card.Title>
        </Card.Header>
        <Card.Body
          style={{
            height: isSmallScreen ? "80dvh" : "79dvh",
            overflowY: "scroll",
          }}
        >
          <Row
            className="mx-1 pb-2"
            style={{ borderBottom: "0.5px solid rgba(255,255,255,0.5)" }}
          >
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
            <Col xs={3} className="d-flex justify-content-end">
              <BootstrapTooltip
                title={editMode ? "Close without saving" : "Edit"}
                placement="left"
              >
                <Button
                  className="bg-transparent border-1 border-white"
                  onClick={() => setEditMode((edit) => !edit)}
                >
                  <FontAwesomeIcon icon={editMode ? faXmark : faPencilAlt} />
                </Button>
              </BootstrapTooltip>
            </Col>
          </Row>
          {/* user preferences */}
          <Row className="mx-1 px-3 py-2 rounded-bottom darker-container">
            {/* bio */}
            <Row className="mt-2">
              <Col className="d-flex justify-content-start">
                <span style={{ fontWeight: "bold" }}>BIO</span>
              </Col>
            </Row>
            <Row className="rounded-3 mb-3 py-1 mx-0 px-0 text-white">
              <Col>
                {!editMode ? (
                  <p
                    style={{ backgroundColor: "rgba(20,20,20,1)" }}
                    className="mb-0 text-start p-1 ps-2 rounded-2"
                  >
                    {bio}
                  </p>
                ) : (
                  <Form.Control
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    as="textarea"
                    placeholder="your bio"
                    style={{ backgroundColor: "rgba(20,20,20,1)" }}
                    className="mb-0 text-start p-1 ps-2 rounded-2 border-0 text-white"
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-start">
                <span style={{ fontWeight: "bold" }}>SOCIALS</span>
              </Col>
            </Row>
            <Row className="py-1 mx-0 px-0 rounded-3">
              <Col>
                <Form onSubmit={handleSubmit}>
                  {Object.keys(socialHandles).map((platform) => (
                    <InputGroup key={platform} className="mb-3 pb-2 ">
                      <InputGroup.Text
                        className="bg-transparent d-flex justify-content-center align-items-center border-0"
                        style={{ width: "40px" }}
                      >
                        <BootstrapTooltip
                          title={
                            platform === "apple_music"
                              ? "apple music"
                              : platform
                          }
                          placement="top"
                        >
                          <FontAwesomeIcon
                            size="lg"
                            icon={getPlatformIcon(platform)}
                            className="text-white"
                          />
                        </BootstrapTooltip>
                      </InputGroup.Text>
                      {!editMode ? (
                        platform === "apple_music" ? (
                          <a
                            href={`https://music.apple.com/profile/${socialHandles[platform]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none d-flex justify-content-between align-items-center bg-transparent text-white ps-2"
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
                            className="d-flex text-decoration-none justify-content-between align-items-center bg-transparent text-white ps-2"
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
                            className="d-flex text-decoration-none justify-content-between align-items-center bg-transparent text-white ps-2"
                          >
                            {socialHandles[platform]
                              ? socialHandles[platform]
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
              {currentUser.providerType === "local-userpass" &&
                isSmallScreen && (
                  <Col xs={6} className="px-0 mb-3">
                    <Button
                      className=" bg-transparent border-white mx-3"
                      onClick={async () => await logOut()}
                    >
                      Log Out
                    </Button>
                  </Col>
                )}
              <Col xs={isSmallScreen ? 6 : 12} className="px-0 ">
                <Button
                  className="mx-3 bg-transparent"
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
