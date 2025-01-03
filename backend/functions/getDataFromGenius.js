exports = async function() {
  const geniusAccessToken = 'VwZ-IyUgiBrf2OMRd5ToKJ1aGWDAHJ9GZe6eBLCE-1bUmPtMawACqkAqN26uR12A';
  const regex = /\s*(?:\(|\s)(?:feat(?:uring)?|ft)\.?.*$/i;

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
    
      async function getAlbum(id) {
      try {
        const response = await context.http.get({
          url: `https://api.genius.com/albums/${encodeURIComponent(id)}`,
          headers: {
            'Authorization': [`Bearer ${geniusAccessToken}`]
          }
        });
  
        const data = EJSON.parse(response.body.text());
        return data
      } catch (error) {
        console.error('Error fetching album from id:', error);
      }
    }
    
    async function getAlbumTracks(id) {
      try {
        const response = await context.http.get({
          url: `https://api.genius.com/albums/${encodeURIComponent(id)}/tracks`,
          headers: {
            'Authorization': [`Bearer ${geniusAccessToken}`]
          }
        });
  
        const data = EJSON.parse(response.body.text());
        return data
      } catch (error) {
        console.error('Error fetching album from id:', error);
      }
    }    
  
    const db = context.services.get("mongodb-atlas").db("discovery")
    const songColl = db.collection("song");
    const songInfoColl = db.collection("songInfo");
    const albumInfoColl = db.collection("albumInfo");
    let songQuery = `nothing`
    let songId = ""
    try {
        const song = await songColl.findOne({is_visible: true});
        const match = song.song_name.match(regex);
        const songNameWithoutFeat = match ? song.song_name.substring(0, match.index).trim() : song.song_name.trim();
        songQuery = `${songNameWithoutFeat} ${song.artist.split(",")[0]}`
        songId = song._id
    } catch(err) {
      console.error("There was an error finding the visible song: ", err)
      
    }
  var {gSongId, gArtistId} = await getSongId(songQuery);
  const song = (await getSong(gSongId)).response.song;
  const artist = (await getArtist(gArtistId)).response.artist;
  const album = (await getAlbum(song.album.id)).response.album;
  const albumTracks = (await getAlbumTracks(song.album.id)).response;
  try {
    await songInfoColl.updateMany({"is_visible": true}, {$set: {"is_visible": false}});
    await songInfoColl.insertOne({artist_name: song.primary_artist.name, 
          song_id: songId, 
          song_name: song.title_with_featured, 
          artist_bio: JSON.stringify(artist.description),
          song_bio: JSON.stringify(song.description),
          artist_twitter: artist.twitter_name,
          artist_facebook: artist.facebook_name,
          artist_instagram: artist.instagram_name,
          artist_image_url: artist.image_url,
          song_art: song.song_art_image_url,
          song_album: song.album.name ,
          song_producers: JSON.stringify(song.producer_artists),
          song_writers: JSON.stringify(song.writer_artists),
          song_release_date: song.release_date_for_display,
          is_song_on_album: song.album.id !== null,
          is_visible: true ,
          });
    await albumInfoColl.updateMany({"is_visible": true}, {$set: {"is_visible": false}});
    await albumInfoColl.insertOne({
          album_name: album.name, 
          album_bio: JSON.stringify(album.description_annotation.annotations[0].body),
          album_art: album.cover_art_url,
          album_release_date: album.release_date_for_display,
          album_tracks: JSON.stringify(albumTracks),
          is_visible: true,
          });
  } catch (err) {
      console.error("There was an error adding the song info: ", err)
  }
   return {song, artist, album, albumTracks}
};