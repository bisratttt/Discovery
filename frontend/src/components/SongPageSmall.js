import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { QUERY_SONG } from "../queries/SongQuery";
import albumArt from "album-art";
import SongInfoLargeScreen from "./SongIntroLargeScreen";
import { useToggleComponents } from "../contexts/ToggleComponents";
import ArtistSongInfo from "./ArtistSongInfo";
import SongButtonsTop from "./SongButtonsTop";
import ShareModal from "./ShareModal";
import SongButtonsBottom from "./SongButtonsBottom";
import CommentCard from "./CommentCard";
import SongSubmissionList from "./SongSubmissionList";
import ProfileCard from "./ProfileCard";
import NavBarBottom from "./NavBarBottom";

// responsive embeding of youtube audio/video files
function YoutubeEmbed({ srcId }) {
  const url = `https://www.youtube.com/embed/${srcId}`;
  return (
    <iframe
      src={url}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}
const cardStyle = {
  minHeight: "93vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.4)", // add a box shadow to create an elevated effect
  backdropFilter: "blur(2rem)", // blurs the background when translucent
  WebkitBackdropFilter: "blur(2rem)",
};
export default function SongPageSmall({ data }) {
  const [albumImg, setAlbumImg] = useState("");
  const [shareModal, setShareModal] = useState(false);

  const {
    openReview,
    openSongSubmissionList,
    openSongInfo,
    setOpenSongInfo,
    openProfile,
    setOnlyOneStateTrue,
  } = useToggleComponents();
  useEffect(() => {
    albumArt(data.song.artist ?? "", {
      album: data.song.album_name ?? "",
      size: "large",
    }).then((album) => setAlbumImg(album));
  }, []);
  return (
    <Container style={{ zIndex: "1", height: "100vh" }} className="px-0">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${albumImg})` }}
      />
      <div className="background-darker" />
      <SongInfoLargeScreen />
      {openSongInfo.openInfo && (
        <div style={{ ...cardStyle }}>
          <ArtistSongInfo active_tab={openSongInfo.active_tab} />
        </div>
      )}
      {!openReview &&
        !openSongInfo.openInfo &&
        !openSongSubmissionList &&
        !openProfile && (
          <div
            style={{ height: "90vh" }}
            className="w-100 d-flex flex-column justify-content-center align-items-center mx-0 px-3"
          >
            <div
              className="w-100 rounded-3"
              style={{ ...cardStyle, minHeight: undefined }}
            >
              <Row>
                <SongButtonsTop setShareModal={setShareModal} />
              </Row>
              <Row style={{ minHeight: "60vh" }}>
                <YoutubeEmbed srcId={data.song.youtube_id} />
              </Row>
              <Row>
                <a
                  onClick={() => {
                    setOpenSongInfo({ openInfo: false, active_tab: "Song" });
                    setOnlyOneStateTrue(setOpenSongInfo);
                  }}
                  className="text-decoration-none text-white song-title"
                >
                  {data.song.song_name ?? ""}
                </a>
              </Row>
              <Row>
                <p
                  onClick={() => {
                    setOpenSongInfo({
                      openInfo: false,
                      active_tab: "Artist",
                    });
                    setOnlyOneStateTrue(setOpenSongInfo);
                  }}
                  className="text-decoration-none text-muted artist-name"
                >
                  {data.song.artist ?? ""}
                </p>
              </Row>
              <Row className="mt-1">
                <SongButtonsBottom
                  spotify_link={data?.song?.spotify_link}
                  apple_music_link={data?.song?.apple_music_link}
                  song_id={data?.song._id}
                />
              </Row>
            </div>
          </div>
        )}
      {openReview && (
        <div style={{ ...cardStyle }}>
          <CommentCard songId={data.song._id} />
        </div>
      )}
      {openSongSubmissionList && (
        <div style={{ ...cardStyle }}>
          <SongSubmissionList />
        </div>
      )}
      {openProfile && (
        <div style={{ ...cardStyle }}>
          <ProfileCard />
        </div>
      )}
      <NavBarBottom />
      <ShareModal
        show={shareModal}
        onHide={() => setShareModal(false)}
        shareLink="#!"
      />
    </Container>
  );
}
