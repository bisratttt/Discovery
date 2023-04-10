exports = async function() {
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
      const gSongId = data.response.hits[0].result.id;
      const gArtistId = data.response.hits[0].result.primary_artist.id;
      return {gSongId, gArtistId}
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

  async function getArtist(id) {
      try {
        const response = await context.http.get({
          url: `https://api.genius.com/artists/${encodeURIComponent(id)}`,
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
  
    const db = context.services.get("mongodb-atlas").db("discovery")
    const songColl = db.collection("song");
    const songInfoColl = db.collection("songInfo");
    let songQuery = `nothing`
    let songId = ""
    try {
        const song = await songColl.findOne({is_visible: true});
        songQuery = `${song.song_name} ${song.artist}`
        songId = song._id
    } catch(err) {
      console.error("There was an error finding the visible song: ", err)
      
    }
  var {gSongId, gArtistId} = await getSongId(songQuery);
  const song = (await getSong(gSongId)).response.song;
  const artist = (await getArtist(gArtistId)).response.artist;
  try {
    await songInfoColl.insertOne({artist_name: song.primary_artist.name, 
          song_id: songId, 
          song_name: song.song_name, 
          artist_bio: JSON.stringify(artist.description),
          song_bio: JSON.stringify(song.description),
          is_visible: true ,
          });
  } catch (err) {
      console.error("There was an error adding the song info: ", err)
  }
  
};