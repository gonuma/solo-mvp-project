import "./App.css";
import react, { useState, useEffect } from "react";
import axios from "axios";
import Users from "./components/Users";
import TrackList from "./components/TrackList";
// import Comments from "./components/Comments";

function App(props) {
  const [selectedVid, setSelectedVid] = useState("Default");
  // const [comments, setComments] = useState([]);
  const [trackList, setTrackList] = useState([]);
  const [youtubeVideo, setYoutubeVideo] = useState(
    "https://www.youtube.com/embed/dQw4w9WgXcQ"
  );

  const API = "AIzaSyDTlAN8Wbd6CyQKeGJs6S8UY3eOZbSJlj8";
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
          query: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&q=${urlQuery}&key=${API}`,
        });
        setTrackList([...temp]);
        console.log(trackList);
      }
    });
  }, []);

  return (
    <div className="App">
      <Users
        deleteEntry={() => {
          let band = document.getElementById("groupInput").value;
          let song = document.getElementById("songInput").value;
          if (band === "deletesong") {
            axios
              .delete(`/songs/${song}`)
              .then(() => {
                return console.log("Song deleted!");
              })
              .then(() => {
                for (let i = 0; i < trackList.length; i++) {
                  if (trackList[i].song === song) {
                    let tempArray = trackList.splice(i, 1);
                    setTrackList([...trackList]);
                  }
                }
              });
          }
        }}
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
          axios
            .post(`/song/${band}/${song}`)
            .then(
              array.unshift({
                group: band,
                song: song,
                query: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&q=${urlQuery}&key=${API}`,
              })
            )
            .then(setTrackList([...array]));
        }}
      />
      <TrackList
        trackList={trackList}
        youtubeVideo={youtubeVideo}
        onClick={(e) => {
          for (const track of trackList)
            if (e.target.innerHTML === `${track.group} - ${track.song}`) {
              return (
                fetch(`${track.query}`)
                  .then((res) => res.json())
                  // .then(console.log(track))
                  .then((response) =>
                    setYoutubeVideo(
                      `https://www.youtube.com/embed/${response.items[0].id.videoId}`
                    )
                  )
                // .then(setSelectedVid(track.song))
                // .then(
                //   axios
                //     .get(`/comments/${track.song}`)
                //     .then((res) => setComments(res.data))
                // )
              );
            }
        }}
      />
      {/* <Comments selectedVid={selectedVid} comments={comments} /> */}
    </div>
  );
}

export default App;
