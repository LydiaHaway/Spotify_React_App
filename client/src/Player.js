import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <div className="player">
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        styles={{
          bgColor: "rgb(40, 40, 50)",
          color: "#056952",
          sliderColor: "rgb(28, 28, 39)",
          sliderColor: "#056952",
          sliderHandleColor: "lightgrey",
        }}
      />
    </div>
  );
}
