import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=3966daf652cd4879b82b784315cc42ce&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

function login() {
  return (
    <div className="container_login">
      <a className="login_button" href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  );
}

export default login;
