import gql from "graphql-tag";

export const ADD_REVIEW_REACTION = gql`
  mutation AddReviewReaction(
    $user_id: ObjectId!
    $review_id: ObjectId!
    $reaction: String!
  ) {
    insertOneReviewReaction(
      data: {
        reaction_unicode: $reaction
        user_id: $user_id
        review_id: $review_id
      }
    ) {
      _id
      reaction_unicode
    }
  }
`;

export const UPDATE_REVIEW_REACTION = gql`
  mutation UpdateReviewReaction(
    $user_id: ObjectId!
    $review_id: ObjectId!
    $reaction: String!
  ) {
    updateOneReviewReaction(
      query: { user_id: $user_id, review_id: $review_id }
      set: { reaction_unicode: $reaction }
    ) {
      _id
      reaction_unicode
    }
  }
`;
