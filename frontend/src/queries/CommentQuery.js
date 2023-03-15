import gql from "graphql-tag";
const FETCH_COMMENTS = gql`
  query FetchComment {
    comments(limit: 20) {
      _id
      username
      time
      body
    }
  }
`;

const ADD_COMMENT = gql`
  mutation AddComment($username: String!, $body: String!) {
    _id
    username
    time
    body
  }
`;
