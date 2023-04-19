import gql from "graphql-tag";

export const QUERY_ALBUMINFO = gql`
  query AlbumInfo {
    albumInfo {
      _id
      album_bio
      album_track_count
      album_art
      album_release_date
      album_tracks
      album_name
    }
  }
`;
