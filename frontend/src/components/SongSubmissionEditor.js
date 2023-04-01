import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useErrorAlert } from "../hooks/useErrorAlert";
import { checkReviewForError } from "../hooks/handleError";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../queries/CommentQuery";
import {ADD_SUBMISSION} from "../queries/SongSubmissionQuery";
import { BSON } from "realm-web";
import { useRealmApp } from "../contexts/RealmApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function SongSubmissionEditor({onHide}) {
    const [artist, setArtist] = useState("");
    const [song_name, setSongName] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");
    const wordCount = song_name.trim() ? song_name.trim().split(/\s+/).length : 0;
    const [submissionSaving, setSubmissionSaving] = useState(false);
    const { currentUser } = useRealmApp();
    const [error, setError] = useState("");
    const [ 
        addSongSubmission,
        { loading: mutationLoading, reset, error: mutationError },
  ] = useMutation(ADD_SUBMISSION);
  const ErrorAlert = useErrorAlert({
    error: error || mutationError,
    clearError: () => setError(""),
  });
  const handleSave = (event) => {
    setSubmissionSaving(true);
    checkReviewForError(null, setError, wordCount, artist.trim().length > 0);
    if (error === "") {
      addSongSubmission({
        variables: {
          username: currentUser.profile.email,
//          owner_id: new BSON.ObjectId(currentUser.id),
          artist: artist,
          song_name: song_name,
//          youtube_id: "",
        },
        onCompleted: () => {
          onHide(true);
        },
      });
      // Update the last updated timestamp
      setLastUpdated(new Date().toLocaleString());
    }
    setSubmissionSaving(false);
  };
  return (
    <Form>
      <Form.Group controlId="artistName">
        <Form.Control
          className="artist-name text-white"
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          style={{ backgroundColor: "transparent" }}
        />
      </Form.Group>
      <Form.Group controlId="songName">
        <Form.Control
          className="submission-body text-white"
          type="text"
          placeholder="Song title"
          value={song_name}
          onChange={(e) => setSongName(e.target.value)}
          style={{ backgroundColor: "transparent" }}
        />
        <Form.Text className="text-muted">{wordCount} words</Form.Text>
        <ErrorAlert />
      </Form.Group>
      <Row>
        <Col sm={6} className="d-flex justify-content-start align-items-end">
          {lastUpdated && (
            <span
              style={{ fontSize: "clamp(0.5rem, 5vw, 0.8rem)" }}
              className="text-muted"
            >
              Last updated: {lastUpdated}
            </span>
          )}
        </Col>
        <Col sm={6} className="d-flex justify-content-end">
          <Button
            disabled={mutationLoading}
            className="border-0 text-black ps-5 pe-5 mt-2 fw-bold"
            variant="primary"
            onClick={handleSave}
            style={{
              fontSize: "1rem",
              boxShadow: "none",
              backgroundColor: "rgba(255,255,255,0.7)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(255,255,255,0.7)";
            }}
          >
            {mutationLoading && (
              <FontAwesomeIcon icon={faSpinner} spin className="pe-2" />
            )}
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}