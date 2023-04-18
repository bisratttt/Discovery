import * as Realm from "realm-web";

export function handleAuthenticationError(err, setError) {
  const handleUnknownError = () => {
    setError((prevError) => ({
      ...prevError,
      other: "Something went wrong. Try again in a little bit.",
    }));
    console.warn(
      "Something went wrong with a Realm login or signup request. See the following error for details."
    );
    console.error(err);
  };
  if (err instanceof Realm.MongoDBRealmError) {
    const { error, statusCode } = err;
    const errorType = error || statusCode;
    switch (errorType) {
      case "invalid username":
        setError((prevError) => ({
          ...prevError,
          username: "Invalid username.",
        }));
        break;
      case "invalid username/password":
      case "invalid password":
      case 401:
        setError((prevError) => ({
          ...prevError,
          password: "Incorrect password.",
        }));
        break;
      case "name already in use":
      case 409:
        setError((prevError) => ({
          ...prevError,
          username: "username is already registered.",
        }));
        break;
      case "password must be between 6 and 128 characters":
      case 400:
        setError((prevError) => ({
          ...prevError,
          password: "Password must be between 6 and 128 characters.",
        }));
        break;
      default:
        handleUnknownError();
        break;
    }
  } else {
    handleUnknownError();
  }
}

export async function checkReviewForError({
  serverError,
  wordCount,
  hasTitle,
}) {
  const error =
    wordCount < 5
      ? "Please your review needs to be at least a few words!"
      : !hasTitle
      ? "You need a title for your review!"
      : serverError
      ? "Something went wrong. Try again in a little bit."
      : "";
  return error;
}

export async function checkSubmissionForError({
  serverError,
  hasSongName,
  hasArtist,
  noteShortEnough,
}) {
  const error = !hasArtist
    ? "You need an artist for your submission"
    : !hasSongName
    ? "You need a song name for your submission"
    : !noteShortEnough
    ? "Your note is too long!"
    : serverError
    ? "Something went wrong. Try again in a little bit."
    : "";
  return error;
}
