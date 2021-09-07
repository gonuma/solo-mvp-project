import "./App.css";
import react, { useState, useEffect } from "react";
import axios from "axios";
import Users from "./components/Users";
import TrackList from "./components/TrackList";

function App(props) {
  const { onClick } = props;

  const [trackList, setTrackList] = useState([]);
  useEffect(() => {}, []);

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
        trackList.unshift({
          group: track.band_name,
          song: track.song_name,
          query: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&order=viewCount&q=${urlSong}&key=${API}`,
        });
        setTrackList([...temp]);
        console.log(urlSong);
        // console.log(trackList);
      }
    });
  }, []);

  return (
    <div className="App">
      <h1>musispace</h1>
      <Users
        onClick={(e) => {
          const array = trackList;
          let band = document.getElementById("groupInput").value;
          let song = document.getElementById("songInput").value;
          let urlSong = song;
          if (song.includes(" ")) {
            urlSong = song.replaceAll(" ", "%20");
          }
          // let comment = document.getElementById("comment").value;
          axios
            .post(`/song/${band}/${song}`)
            .then((response) => console.log(response.data))
            .then(
              array.unshift({
                group: band,
                song: song,
                query: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&order=viewCount&q=${urlSong}&key=${API}`,
              })
            )
            .then(setTrackList([...array]))
            .then(console.log(trackList));
          // .then(console.log(array[0].query));
        }}
      />
      <TrackList
        trackList={trackList}
        onClick={(e) => {
          console.log("Hello");
          // for (const track of trackList) {
          //   if (track.group + "-" + track.song === e.target.innerHTML) {
          //     console.log(e.target.innerHTML);
          //   }
          // if (`${track.group} - ${track.song}` === e.target) {
          //   console.log("e.target");
          // }
          // }
        }}
      />
    </div>
  );
}

export default App;
