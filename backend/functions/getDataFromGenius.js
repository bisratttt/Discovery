exports = async function(query) {
  const geniusAccessToken = 'your_genius_api_access_token';

  async function getSongId(query) {
    try {
      const response = await context.http.get({
        url: `https://api.genius.com/search?q=${encodeURIComponent(query)}`,
        headers: {
          'Authorization': `Bearer ${geniusAccessToken}`
        }
      });

      const data = EJSON.parse(response.body.text());
      return data.response.hits[0].result.id;
    } catch (error) {
      console.error('Error fetching song from search:', error);
    }
  }

  async function getSong(id) {
    try {
      const response = await context.http.get({
        url: `https://api.genius.com/songs/${encodeURIComponent(id)}`,
        headers: {
          'Authorization': `Bearer ${geniusAccessToken}`
        }
      });

      const data = EJSON.parse(response.body.text());
      return data
    } catch (error) {
      console.error('Error fetching songs from id:', error);
    }
  }
};
