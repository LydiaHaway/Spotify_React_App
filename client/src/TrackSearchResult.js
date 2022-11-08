import React from "react";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div className="tracks_container" onClick={handlePlay}>
      <img src={track.albumUrl} />
      <div className="tracks_info">
        <p>{track.artist}</p>
        <p className="title">{track.title}</p>
      </div>
    </div>
  );
}
