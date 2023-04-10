import gql from "graphql-tag";

export const GET_USER_PREFERENCES = gql`
  query FetchUserPreferences($user_id: ObjectId!) {
    userPreference(query: { user_id: $user_id }) {
      facebook_handle
      instagram_handle
      tiktok_handle
      twitter_handle
      youtube_handle
    }
  }
`;

export const ADD_PREFERENCES = gql`
  mutation AddUserPreferences(
    $user_id: ObjectId!
    $youtube: String
    $facebook: String
    $instagram: String
    $twitter: String
    $tiktok: String
  ) {
    insertOneUserPreference(
      data: {
        user_id: $user_id
        facebook_handle: $facebook
        instagram_handle: $instagram
        tiktok_handle: $tiktok
        twitter_handle: $twitter
        youtube_handle: $youtube
      }
    ) {
      facebook_handle
      instagram_handle
      tiktok_handle
      twitter_handle
      youtube_handle
    }
  }
`;
export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences(
    $user_id: ObjectId!
    $youtube: String
    $facebook: String
    $instagram: String
    $twitter: String
    $tiktok: String
  ) {
    updateOneUserPreference(
      query: { user_id: $user_id }
      set: {
        facebook_handle: $facebook
        instagram_handle: $instagram
        tiktok_handle: $tiktok
        twitter_handle: $twitter
        youtube_handle: $youtube
      }
    ) {
      facebook_handle
      instagram_handle
      tiktok_handle
      twitter_handle
      youtube_handle
    }
  }
`;
