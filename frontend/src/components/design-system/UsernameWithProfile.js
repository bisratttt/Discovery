import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_USER_PREFERENCES_NAME } from "../../queries/UserPreferencesQuery";
import { Col, OverlayTrigger, Popover, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPlatformIcon } from "../../utils/utils";

// clickable username with a profile popover
export default function UsernameWithProfile({ username }) {
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
  const [noSocials, setNoSocials] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const { loading, error, data } = useQuery(GET_USER_PREFERENCES_NAME, {
    variables: { username: username },
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
    },
  });
  const ProfilePopover = (props) => {
    return (
      <>
        {loading ? (
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
        ) : (
          <Popover {...props} bsPrefix="popover darker-container min-w-popover">
            <Popover.Header className="darker-container text-white d-flex justify-content-center align-items-center">
              Profile
            </Popover.Header>
            <Popover.Body className="pb-2">
              <Row>
                <Col className="d-flex justify-content-start text-white">
                  <span style={{ fontWeight: "bold" }}>BIO</span>
                </Col>
              </Row>
              <Row
                className="rounded-1 py-1 mx-0 px-0 text-white"
                style={{ background: "rgba(41,41,41, 0.4)" }}
              >
                <Col>
                  <p className="mb-0 text-start">
                    {data.userPreference && data.userPreference.bio !== ""
                      ? data.userPreference.bio
                      : "no-bio"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-start text-white">
                  <span style={{ fontWeight: "bold" }}>SOCIALS</span>
                </Col>
              </Row>
              <Row
                className="rounded-1 py-1 mx-0 px-0 "
                style={{ background: "rgba(41,41,41, 0.4)" }}
              >
                {Object.keys(socialHandles).map((platform) => {
                  if (
                    socialHandles[platform] &&
                    socialHandles[platform] !== ""
                  ) {
                    setNoSocials(false);
                    return (
                      <Row>
                        <Col xs={3}>
                          <FontAwesomeIcon
                            className="text-white"
                            icon={getPlatformIcon(platform)}
                          />
                        </Col>
                        <Col xs={9}>
                          {platform === "apple_music" ? (
                            <a
                              href={`https://music.apple.com/profile/${socialHandles[platform]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-transparent border-0 text-white"
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
                              className="bg-transparent border-0 text-white"
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
                              className="bg-transparent border-0 text-white"
                            >
                              {socialHandles[platform]}
                            </a>
                          )}
                        </Col>
                      </Row>
                    );
                  }
                })}
                {noSocials && (
                  <span className="text-white mb-0">no-socials</span>
                )}
              </Row>
            </Popover.Body>
          </Popover>
        )}
      </>
    );
  };
  return (
    <OverlayTrigger
      trigger="click"
      placement="auto"
      delay={{ show: 250, hide: 0 }}
      overlay={ProfilePopover}
      rootClose={true}
    >
      <strong
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={isHover && "text-decoration-underline"}
        style={{ cursor: "pointer" }}
      >
        {username}
      </strong>
    </OverlayTrigger>
  );
}
