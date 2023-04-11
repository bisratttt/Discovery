import gql from "graphql-tag";

export const ADD_FEEDBACK = gql`
  mutation AddFeedback($song_id: ObjectId!, $body: String!) {
    insertOneFeedback(data: { body: $body, song_id: $song_id }) {
      _id
    }
  }
`;
