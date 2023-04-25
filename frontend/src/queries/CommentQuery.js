import gql from "graphql-tag";
export const FETCH_COMMENTS = gql`
  query FetchComment($limit: Int!, $lastTime: DateTime!, $song_id: ObjectId!) {
    comments(query: { song: $song_id, time_gt: $lastTime }, limit: $limit) {
      _id
      username
      time
      body
      title
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment(
    $username: String!
    $body: String!
    $song: ObjectId!
    $owner_id: ObjectId!
    $title: String!
  ) {
    insertOneComment(
      data: {
        username: $username
        song: $song
        body: $body
        owner_id: $owner_id
        title: $title
      }
    ) {
      _id
      username
      time
      body
      title
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment(
    $body: String!
    $song: ObjectId!
    $owner_id: ObjectId!
    $title: String!
  ) {
    updateOneComment(
      body: $body
      title: $title
    ) {
      body
      title
    }
  }
`;
