import gql from "graphql-tag";

export const ADD_SUBMISSION_REACTION = gql`
  mutation AddSubmissionReaction(
    $user_id: ObjectId!
    $submission_id: ObjectId!
    $reaction: String!
  ) {
    insertOneSubmissionReaction(
      data: {
        reaction_unicode: $reaction
        user_id: $user_id
        submission_id: $submission_id
      }
    ) {
      _id
      reaction_unicode
    }
  }
`;

export const UPDATE_SUBMISSION_REACTION = gql`
  mutation UpdateSubmissionReaction(
    $user_id: ObjectId!
    $submission_id: ObjectId!
    $reaction: String!
  ) {
    updateOneSubmissionReaction(
      query: { user_id: $user_id, submission_id: $submission_id }
      set: { reaction_unicode: $reaction }
    ) {
      _id
      reaction_unicode
    }
  }
`;

export const FETCH_SUBMISSION_REACTIONS = gql`
  query FetchSubmissionReactions($submission_id: ObjectId!) {
    getReactionCounts(input: { submission_id: $submission_id }) {
      reaction_unicode
      count
    }
  }
`;
