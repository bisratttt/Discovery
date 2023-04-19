import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useErrorAlert } from "../hooks/useErrorAlert";
import { checkSubmissionForError } from "../hooks/handleError";
import { useMutation } from "@apollo/client";
import { UPDATE_SUBMISSION} from "../queries/SongSubmissionQuery";
import { BSON } from "realm-web";
import { useRealmApp } from "../contexts/RealmApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function SongSubmissionUpdateEditor({a,s,n,onHide}) {
    const [artist, setArtist] = useState(a);
    const [song_name, setSongName] = useState(s);
    const [note, setNote] = useState(n);
    const charCount = note ? note.length : 0;
    const { currentUser } = useRealmApp();
    const [error, setError] = useState("");
    const [
      updateSongSubmission,
      { loading: mutationLoading, reset, error: mutationError },
    ] = useMutation(UPDATE_SUBMISSION);
    const ErrorAlert = useErrorAlert({
      error: error,
      clearError: () => setError(""),
    });
    const handleSave = async (event) => {
      event.preventDefault();
      const error = await checkSubmissionForError({
        serverError: mutationError !== undefined,
        hasSongName: song_name.trim().length > 0,
        hasArtist: artist.trim().length > 0,
        noteShortEnough: note.trim().length < 136,
      });
      setError(error);
      if (error === "") {
        updateSongSubmission({
          variables: {
            user_id: new BSON.ObjectId(currentUser.id),
            artist: artist,
            song_name: song_name,
            note: note,
          },
          onCompleted: () => {
            // refetch();
            onHide();
          },
        });
      }
    };
    const handleCancel = () => {
      onHide(true);
    };
    return (
      <Form>
        <Form.Group controlId="artistName">
          <Form.Control
            className="artist-name text-white"
            type="text"
            placeholder= {a}
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            style={{ backgroundColor: "transparent" }}
          />
        </Form.Group>
        <Form.Group controlId="songName">
          <Form.Control
            className="submission-body text-white"
            type="text"
            placeholder={s}
            value={song_name}
            onChange={(e) => setSongName(e.target.value)}
            style={{ backgroundColor: "transparent" }}
          />
        </Form.Group>
        <Form.Group controlId="note">
          <Form.Control
            className="submission-body text-white"
            as="textarea"
            rows={3}
            placeholder={n}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ backgroundColor: "transparent" }}
          />
          <Form.Text className="text-muted">{charCount}/135 characters</Form.Text>
          <ErrorAlert />
        </Form.Group>
        <Row className="d-flex justify-content-end">
            <Col className="d-flex justify-content-end">
            <Button
              disabled={mutationLoading}
              className="border-0 text-black ps-5 pe-5 mt-2 fw-bold"
              variant="primary"
              onClick={handleCancel}
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
              Cancel
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-end">
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
  