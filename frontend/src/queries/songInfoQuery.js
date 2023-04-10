import gql from "graphql-tag";

export const QUERY_SONGINFO = gql`
query SongInfo {
    songInfo {
        _id
        artist_name
        artist_bio
        song_name
        song_bio
        song_id
    }
}
`;