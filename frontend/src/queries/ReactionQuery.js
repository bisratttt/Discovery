import gql from "graphql-tag";

export const ADD_REACTION = gql`
  mutation AddReaction(
    $user_id: ObjectId!
    $song_id: ObjectId!
    $reaction: String!
  ) {
    insertOneSongReaction(
      data: {
        reaction_unicode: $reaction
        user_id: $user_id
        song_id: $song_id
      }
    ) {
      _id
      reaction_unicode
    }
  }
`;

export const UPDATE_REACTION = gql`
  mutation UpdateReaction(
    $user_id: ObjectId!
    $song_id: ObjectId!
    $reaction: String!
  ) {
    updateOneSongReaction(
      query: { user_id: $user_id, song_id: $song_id }
      set: { reaction_unicode: $reaction }
    ) {
      _id
      reaction_unicode
    }
  }
`;

export const FETCH_REACTIONS = gql`
  query FetchReactions($song_id: ObjectId!) {
    getReactionCounts(input: { song_id: $song_id }) {
      reaction_unicode
      count
    }
  }
`;
