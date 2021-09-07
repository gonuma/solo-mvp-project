import "./App.css";
import react, { useState, useEffect } from "react";
import axios from "axios";
import Users from "./components/Users";
import TrackList from "./components/TrackList";

function App(props) {
  const { onClick } = props;

  const [trackList, setTrackList] = useState([]);
  const [youtubeVideo, setYoutubeVideo] = useState(
    "https://www.youtube.com/embed/dQw4w9WgXcQ"
  );

  const API = "AIzaSyBfPHBlVhS2FknDZr6pxXkKP2NhA-zt0xY";
  const resultLimit = 1;

  let temp = [];
  useEffect(() => {
    temp = trackList;
    axios.get("/songs").then((res) => {
      for (const track of res.data) {
        let urlSong = track.song_name;
        if (track.song_name.includes(" ")) {
          urlSong = track.song_name.replaceAll(" ", "%20");
        }
        let urlGroup = track.band_name;
        if (track.band_name.includes(" ")) {
          urlGroup = track.band_name.replaceAll(" ", "%20");
        }
        let urlQuery = `${urlGroup}%20${urlSong}`;
        trackList.unshift({
          group: track.band_name,
          song: track.song_name,
          // query: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&q=${urlQuery}&key=${API}`,
        });
        setTrackList([...temp]);
      }
    });
  }, []);

  return (
    <div className="App">
      <Users
        onClick={(e) => {
          const array = trackList;
          let band = document.getElementById("groupInput").value;
          let song = document.getElementById("songInput").value;
          let urlSong = song;
          if (song.includes(" ")) {
            urlSong = song.replaceAll(" ", "%20");
          }
          let urlGroup = band;
          if (band.includes(" ")) {
            urlGroup = band.replaceAll(" ", "%20");
          }
          let urlQuery = `${urlGroup}%20${urlSong}`;
          // let comment = document.getElementById("comment").value;
          axios
            .post(`/song/${band}/${song}`)
            .then((response) => console.log(response.data))
            .then(
              array.unshift({
                group: band,
                song: song,
                // query: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&q=${urlQuery}&key=${API}`,
              })
            )
            .then(setTrackList([...array]))
            .then(console.log(trackList));
          // console.log(youtubeVideo);

          // .then(console.log(array[0].query));
        }}
      />
      <TrackList
        trackList={trackList}
        youtubeVideo={youtubeVideo}
        onClick={(e) => {
          for (const track of trackList)
            if (e.target.innerHTML === `${track.group} - ${track.song}`) {
              return fetch(`${track.query}`)
                .then((res) => res.json())
                .then((response) =>
                  setYoutubeVideo(
                    `https://www.youtube.com/embed/${response.items[0].id.videoId}`
                  )
                );
            }
        }}
      />
    </div>
  );
}

export default App;
