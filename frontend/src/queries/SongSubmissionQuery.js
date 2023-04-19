import gql from "graphql-tag";
export const FETCH_SUBMISSIONS = gql`
  query FetchUserSongSuggestion {
    userSongSubmissions(query: {}) {
      _id
      username
      artist
      song_name
      note
      time
      youtube_id
    }
  }
`;

export const ADD_SUBMISSION = gql`
  mutation AddUserSongSubmission(
    $user_id: ObjectId!
    $username: String!
    $artist: String!
    $song_name: String!
    $note: String!
  ) {
    insertOneUserSongSubmission(
      data: {
        user_id: $user_id
        username: $username
        song_name: $song_name
        artist: $artist
        note: $note
      }
    ) {
      _id
      username
      artist
      song_name
      note
    }
  }
`;

export const UPDATE_SUBMISSION = gql`
  mutation UpdateUserSongSubmission(
    $user_id: ObjectId!
    $artist: String!
    $song_name: String!
    $note: String!
  ) {
    updateOneUserSongSubmission(
      query: { user_id: $user_id }
      set: { song_name: $song_name
        artist: $artist
        note: $note }
    ) {
      artist
      song_name
      note
    }
  }
`;
