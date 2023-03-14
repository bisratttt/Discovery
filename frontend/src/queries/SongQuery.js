import gql from "graphql-tag";

export const QUERY_SONG = gql`
  query Song {
    song {
      _id
      album_name
      artist
      song_name
      apple_music_link
      spotify_link
    }
  }
`;
