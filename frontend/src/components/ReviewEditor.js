import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useErrorAlert } from "../hooks/useErrorAlert";
import { checkReviewForError } from "../hooks/handleError";

export default function ReviewEditor() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const [error, setError] = useState("");
  const ErrorAlert = useErrorAlert({
    error: error,
    clearError: () => setError(""),
  });
  const handleSave = () => {
    // Save the review data here
    // ...
    checkReviewForError(null, setError, wordCount, title.trim().length > 0);
    console.log(title.trim().length);
    // Update the last updated timestamp
    setLastUpdated(new Date());
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
          rows={10}
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
              Last updated: {lastUpdated.toLocaleString()}
            </span>
          )}
        </Col>
        <Col sm={6} className="text-right d-flex justify-content-end">
          <Button
            style={{
              backgroundColor: "rgba(186, 45, 11, 0.6)",
              border: "none",
            }}
            className="ps-4 pe-4 mt-2"
            variant="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
