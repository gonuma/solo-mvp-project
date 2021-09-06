import "./App.css";
import react, { useState, useEffect } from "react";
import axios from "axios";
import Users from "./components/Users";
import TrackList from "./components/TrackList";

function App() {
  const [trackList, setTrackList] = useState([]);
  useEffect(() => {}, [trackList]);

  let temp = [];
  useEffect(() => {
    temp = trackList;
    axios.get("/songs").then((res) => {
      for (const track of res.data) {
        temp.unshift({ group: track.band_name, song: track.song_name });
        setTrackList([...temp]);
        console.log("BM");
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
            .then(array.unshift({ group: band, song: song }))
            .then(setTrackList([...array]))
            .then(console.log(trackList));
        }}
      />
      <TrackList trackList={trackList} />
    </div>
  );
}

export default App;
