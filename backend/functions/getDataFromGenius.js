exports = async function(query) {
  const geniusAccessToken = 'VwZ-IyUgiBrf2OMRd5ToKJ1aGWDAHJ9GZe6eBLCE-1bUmPtMawACqkAqN26uR12A';

  async function getSongId(query) {
    try {
      const response = await context.http.get({
        url: `https://api.genius.com/search?q=${encodeURIComponent(query)}`,
        headers: {
          'Authorization': [`Bearer ${geniusAccessToken}`]
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
          'Authorization': [`Bearer ${geniusAccessToken}`]
        }
      });

      const data = EJSON.parse(response.body.text());
      return data
    } catch (error) {
      console.error('Error fetching songs from id:', error);
    }
  }
  
  var songID = await getSongId(query);
  return await getSong(songID);
};
