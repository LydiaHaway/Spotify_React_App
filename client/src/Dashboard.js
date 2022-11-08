import React, { useEffect, useState } from "react";
import UseAuth from "./UseAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import axios from "axios";

const SpotifyApi = new SpotifyWebApi({
  clientId: "3966daf652cd4879b82b784315cc42ce",
});

function Dashboard({ code }) {
  const accessToken = UseAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  const [topAlbum, setTopAlbum] = useState([]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    SpotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;
    SpotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          console.log(track);
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    SpotifyApi.getArtistAlbums("3M262EJKm5CyZnandcAd31", { limit: 4 }).then(
      (res) => {
        console.log(res.body.items);
        setTopAlbum(
          res.body.items.map((album) => {
            return {
              artist: album.artists[0].name,
              title: album.name,
              uri: album.uri,
              albumUrl: album.images[0].url,
            };
          })
        );
      }
    );
  }, [accessToken]);

  console.log(searchResults);
  return (
    <>
      <h1>Spotify</h1>

      <div className="container_results">
        <div className="search_box">
          <input
            type="search"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="tracks_box top_album">
          <h2>Top albums</h2>
          {topAlbum.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>

        <hr />

        <div className="tracks_box">
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
          {searchResults.length === 0 && (
            <div className="lyrics_box">{lyrics}</div>
          )}
        </div>
        <div>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
