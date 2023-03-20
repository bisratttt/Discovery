import gql from "graphql-tag";
export const FETCH_COMMENTS = gql`
  query FetchComment($limit: Int!, $lastTime: DateTime!) {
    comments(query: { time_gt: $lastTime }, limit: $limit) {
      _id
      username
      time
      body
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment(
    $username: String!
    $body: String!
    $song: ObjectId!
    $owner_id: ObjectId!
  ) {
    insertOneComment(
      data: {
        username: $username
        song: $song
        body: $body
        owner_id: $owner_id
      }
    ) {
      _id
      username
      time
      body
    }
  }
`;
