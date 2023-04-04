exports = async function(query) {
  const geniusAccessToken = 'your_genius_api_access_token';

  async function searchSongs(query) {
    try {
      const response = await context.http.get({
        url: `https://api.genius.com/search?q=${encodeURIComponent(query)}`,
        headers: {
          'Authorization': `Bearer ${geniusAccessToken}`
        }
      });

      const data = EJSON.parse(response.body.text());
      return data.response.hits;
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  }

  async function getSongLyrics(url) {
    try {
      const response = await context.http.get({ url: url });

      // Extract lyrics from the HTML using regex
      // This is a basic example, consider using an HTML parser for a more robust solution
      const lyricsRegex = /<div class="lyrics">([\s\S]*?)<\/div>/;
      const match = response.body.text().match(lyricsRegex);
      return match ? match[1].trim() : null;
    } catch (error) {
      console.error('Error fetching song lyrics:', error);
    }
  }

  const songs = await searchSongs(query);
  const songPromises = songs.map(async (song) => {
    const lyrics = await getSongLyrics(song.result.url);
    return {
      title: song.result.title,
      artist: song.result.primary_artist.name,
      lyrics: lyrics
    };
  });
  return Promise.all(songPromises);
};
