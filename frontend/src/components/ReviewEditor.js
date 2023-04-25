import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useErrorAlert } from "../hooks/useErrorAlert";
import { checkReviewForError } from "../hooks/handleError";
import { useMutation } from "@apollo/client";
import { UPDATE_COMMENT, FETCH_COMMENTS } from "../queries/CommentQuery";
import { BSON } from "realm-web";
import { useRealmApp } from "../contexts/RealmApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LIMIT = 100;
const LAST_TIME = new Date(0);
export default function ReviewEditor({ onHide, refetch, oldtitle, oldbody }) {
  const [title, setTitle] = useState(oldtitle);
  const [body, setBody] = useState(oldbody);
  const [lastUpdated, setLastUpdated] = useState("");
  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const { currentUser } = useRealmApp();
  const [error, setError] = useState("");
  const [updateComment, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_COMMENT, {
      update: (cache, { data: { insertOneComment } }) => {
        const queryResult = cache.readQuery({
          query: FETCH_COMMENTS,
          variables: { limit: LIMIT, lastTime: LAST_TIME },
        });
        if (queryResult) {
          const { comments } = queryResult;
          cache.writeQuery({
            query: FETCH_COMMENTS,
            variables: { limit: LIMIT, lastTime: LAST_TIME },
            data: {
              comments: [
                { ...insertOneComment, time: new Date() },
                ...comments,
              ],
            },
          });
        } else {
          cache.writeQuery({
            query: FETCH_COMMENTS,
            variables: { limit: LIMIT, lastTime: LAST_TIME },
            data: {
              comments: [{ ...insertOneComment, time: new Date() }],
            },
          });
        }
      },
    });
  const ErrorAlert = useErrorAlert({
    error: error,
    clearError: () => setError(""),
  });
  const handleSave = async (event) => {
    event.preventDefault();
    const error = await checkReviewForError({
      serverError: mutationError !== undefined,
      wordCount,
      hasTitle: title.trim().length > 0,
    });
    setError(error);
    if (error === "") {
      updateComment({
        variables: {
          owner_id: new BSON.ObjectId(currentUser.id),
          body: body,
          title: title,
        },
        onCompleted: () => {
          refetch();
          onHide(true);
          // Update the last updated timestamp
          setLastUpdated(new Date().toLocaleString());
        },
      });
    }
    onHide();
  };
  const handleCancel = () => {
    onHide(true);
  };

  return (
    <Form>
      <Form.Group controlId="reviewTitle">
        <Form.Control
          className="review-title text-white"
          type="text"
          placeholder= {oldtitle}
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
          placeholder={oldbody}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ backgroundColor: "transparent", whiteSpace: "pre-line" }}
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
        <Col sm={3} className="d-flex justify-content-end">
        <Button
              disabled={mutationLoading}
              className="border-0 text-black ps-5 pe-5 mt-2 fw-bold "
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
        <Col sm={3} className="d-flex justify-content-end">
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
