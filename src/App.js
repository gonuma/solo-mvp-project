import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Users from "./components/Users";
import TrackList from "./components/TrackList";
import Comments from "./components/Comments";

function App() {
  const [selectedVid, setSelectedVid] = useState("Default");
  const [comments, setComments] = useState([]);
  const [trackList, setTrackList] = useState([]);
  const [youtubeVideo, setYoutubeVideo] = useState("dQw4w9WgXcQ");

  const API = process.env.API_KEY;
  const resultLimit = 1;

  useEffect(() => {
    axios.post(`/songs/${selectedVid}/${youtubeVideo}`);
    // .then((res) => console.log(res.data));
    // console.log(selectedVid, youtubeVideo);
  }, [youtubeVideo]);

  let temp = [];
  useEffect(() => {
    temp = trackList;
    axios.get("/songs").then((res) => {
      for (const track of res.data) {
        if (track.url) {
          // console.log(track);
          trackList.unshift({
            group: track.band_name,
            song: track.song_name,
            url: track.url,
          });
        }

        if (!track.url) {
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
        }
        setTrackList([...temp]);
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
          document.getElementById("groupInput").value = null;
          document.getElementById("songInput").value = null;

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
              if (track.url) {
                axios
                  .get(`/comments/${track.song}`)
                  .then((res) => setComments(res.data));
                setSelectedVid(track.song);
                return setYoutubeVideo(track.url);
              }
              if (!track.url) {
                console.log("No URL found here");
                return fetch(`${track.query}`)
                  .then((res) => res.json())
                  .then((response) => {
                    let newVid = response.items[0].id.videoId;
                    setYoutubeVideo(newVid);
                  })
                  .then(setSelectedVid(track.song))

                  .then(
                    axios
                      .get(`/comments/${track.song}`)
                      .then((res) => setComments(res.data))
                  );
              }
            }
        }}
      />
      <Comments selectedVid={selectedVid} comments={comments} />
    </div>
  );
}

export default App;
