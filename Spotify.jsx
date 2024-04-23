import React, { useState } from 'react';

const SearchSpotify = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Step 1: Request an access token using client ID and client secret
      const tokenResponse = await fetch(
        'https://accounts.spotify.com/api/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic MTNmOWY2ZDYyZWMzNGFmZThlNmFlZjM0MzNmNjQ1ODE6ZDNmYzgzMGY4YWMzNDRjYTg2ZTU4MDMwYThmYjM5MjI=',
          },
          body: 'grant_type=client_credentials',
        },
      );
      const tokenData = await tokenResponse.json();

      // Step 2: Use the access token to search for tracks
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        },
      );
      const searchData = await searchResponse.json();
      setResults(searchData.tracks.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Search for a song'
          value={query}
          onChange={handleChange}
        />
        <button type='submit'>Search</button>
      </form>
      <div>
        {results.map((track) => (
          <div key={track.id}>
            <h3>{track.name}</h3>
            <p>
              Artist: {track.artists.map((artist) => artist.name).join(', ')}
            </p>
            <p>Album: {track.album.name}</p>
            <img src={track.album.images[0].url} alt='Album Cover' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSpotify;
