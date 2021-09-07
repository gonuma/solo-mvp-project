import "./App.css";
import react, { useState, useEffect } from "react";
import axios from "axios";
import Users from "./components/Users";
import TrackList from "./components/TrackList";

function App() {
  const [trackList, setTrackList] = useState([]);
  useEffect(() => {}, [trackList]);

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
        temp.unshift({
          group: track.band_name,
          song: track.song_name,
          query: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&order=viewCount&q=${urlSong}&key=${API}`,
        });
        setTrackList([...temp]);
        console.log(urlSong);
      }
    });
  }, []);

  // const trackList = [];

  return (
    <div className="App">
      <h1>musispace</h1>
      <Users
        onClick={(e) => {
          const array = trackList;
          let band = document.getElementById("groupInput").value;
          let song = document.getElementById("songInput").value;
          // let comment = document.getElementById("comment").value;
          axios
            .post(`/song/${band}/${song}`)
            .then((response) => console.log(response.data))
            .then(() => {
              let urlSong = song;
              if (song.includes(" ")) {
                urlSong = song.replaceAll(" ", "%20");
              }
              array.unshift({
                group: band,
                song: song,
                query: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&order=viewCount&q=${urlSong}&key=${API}`,
              });
            })
            .then(console.log(array[0].query))
            .then(setTrackList([...array]));
        }}
      />
      <TrackList
        trackList={trackList}
        onClick={(e) => {
          for (const track of trackList) {
            if (track.group + "-" + track.song === e.target.innerHTML) {
              console.log(e.target.innerHTML);
            }
            // if (`${track.group} - ${track.song}` === e.target) {
            //   console.log("e.target");
            // }
          }
        }}
      />
    </div>
  );
}

export default App;
