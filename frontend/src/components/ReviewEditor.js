import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useErrorAlert } from "../hooks/useErrorAlert";
import { checkReviewForError } from "../hooks/handleError";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../queries/CommentQuery";

export default function ReviewEditor() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [commentSaving, setCommentSaving] = useState(false);
  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const [error, setError] = useState("");
  const [
    addComment,
    { loading: mutationLoading, reset, error: mutationError },
  ] = useMutation(ADD_COMMENT);
  const ErrorAlert = useErrorAlert({
    error: error || mutationError,
    clearError: () => setError(""),
  });
  //   const handleEnterKey = (event) => {
  //   if (event.key === "Enter") {
  //     addComment({
  //       variables: {
  //         username: currentUser.profile.email,
  //         owner_id: new BSON.ObjectId(currentUser.id),
  //         body: comment,
  //         song: new BSON.ObjectId(songId),
  //       },
  //       onCompleted: () => {
  //         setComment("");
  //         refetch({
  //           limit: limit,
  //           lastTIme: lastTime,
  //         });
  //       },
  //     });
  //   }
  // };
  const handleSave = (event) => {
    setCommentSaving(true);
    checkReviewForError(null, setError, wordCount, title.trim().length > 0);
    if (error === "") {
      // Update the last updated timestamp
      setLastUpdated(new Date().toLocaleString());
    }
    setCommentSaving(false);
  };

  return (
    <Form>
      <Form.Group controlId="reviewTitle">
        <Form.Control
          className="review-title text-white"
          type="text"
          placeholder="Title of your review"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ backgroundColor: "transparent" }}
        />
      </Form.Group>
      <Form.Group controlId="reviewBody">
        <Form.Control
          className="review-body text-white"
          as="textarea"
          rows={15}
          placeholder="Body of your review"
          value={body}
          onChange={(e) => setBody(e.target.value)}
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
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
