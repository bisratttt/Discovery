exports = async function(song_query){
  const { google } = require("googleapis");
  
  const API_KEY = "AIzaSyAx3GqTuDk8Z1HCf4ITwZ2zoXrkw12qJlg";
  
  async function fetchYoutubeSong(query_string) {
    const search_results = await google.youtube("v3").search.list({
      key: API_KEY,
      part: "snippet",
      maxResults: 10,
      q: query_string,
    });
    
    return search_results.data.items;
  }
  
  return (await fetchYoutubeSong(song_query))[0].id.videoId;
};