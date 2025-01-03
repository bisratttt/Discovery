import gql from "graphql-tag";

export const QUERY_SONGINFO = gql`
  query SongInfo {
    songInfo {
      _id
      artist_name
      artist_bio
      artist_twitter
      artist_instagram
      artist_facebook
      song_name
      song_bio
      song_id
      artist_image_url
      song_art
      song_album
      song_producers
      song_writers
      song_release_date
      is_song_on_album
    }
  }
`;
