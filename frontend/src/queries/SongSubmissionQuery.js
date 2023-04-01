import gql from "graphql-tag";
export const FETCH_SUBMISSIONS = gql`
  query FetchUserSongSuggestion {
    userSongSubmissions(query: {}) {
      _id
      username
      artist
      song_name
    }
  }
`;

export const ADD_SUBMISSION = gql`
  mutation AddUserSongSubmission(
    $user_id: ObjectId!
    $username: String!
    $artist: String!
    $song_name: String!
  ) {
    insertOneUserSongSubmission(
      data: {
        user_id: $user_id
        username: $username
        song_name: $song_name
        artist: $artist
      }
    ) {
        _id
        username
        artist
        song_name
    }
  }
`;
