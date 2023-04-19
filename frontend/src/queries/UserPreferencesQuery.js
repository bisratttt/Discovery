import gql from "graphql-tag";

export const GET_USER_PREFERENCES_ID = gql`
  query FetchUserPreferences($user_id: ObjectId!) {
    userPreference(query: { user_id: $user_id }) {
      facebook_handle
      instagram_handle
      tiktok_handle
      twitter_handle
      youtube_handle
      applemusic_handle
      spotify_handle
      soundcloud_handle
      bio
    }
  }
`;
export const GET_USER_PREFERENCES_NAME = gql`
  query FetchUserPreferences($username: String!) {
    userPreference(query: { username: $username }) {
      facebook_handle
      instagram_handle
      tiktok_handle
      twitter_handle
      youtube_handle
      applemusic_handle
      spotify_handle
      soundcloud_handle
      bio
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
    $bio: String
    $applemusic: String
    $spotify: String
    $soundcloud: String
  ) {
    insertOneUserPreference(
      data: {
        user_id: $user_id
        facebook_handle: $facebook
        instagram_handle: $instagram
        tiktok_handle: $tiktok
        twitter_handle: $twitter
        youtube_handle: $youtube
        applemusic_handle: $applemusic
        spotify_handle: $spotify
        soundcloud_handle: $soundcloud
        bio: $bio
      }
    ) {
      facebook_handle
      instagram_handle
      tiktok_handle
      twitter_handle
      youtube_handle
      applemusic_handle
      spotify_handle
      soundcloud_handle
      bio
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
    $bio: String
    $applemusic: String
    $spotify: String
    $soundcloud: String
  ) {
    updateOneUserPreference(
      query: { user_id: $user_id }
      set: {
        facebook_handle: $facebook
        instagram_handle: $instagram
        tiktok_handle: $tiktok
        twitter_handle: $twitter
        youtube_handle: $youtube
        applemusic_handle: $applemusic
        spotify_handle: $spotify
        soundcloud_handle: $soundcloud
        bio: $bio
      }
    ) {
      facebook_handle
      instagram_handle
      tiktok_handle
      twitter_handle
      youtube_handle
      applemusic_handle
      spotify_handle
      soundcloud_handle
      bio
    }
  }
`;
