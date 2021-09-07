import React from 'react'

const API = "AIzaSyBfPHBlVhS2FknDZr6pxXkKP2NhA-zt0xY";
const result = 1;


export default function Video(props) {
let {youtubeVideo, className} = props
    
    return (
        <div className="Tracks">
            {/* <div className="Player"> */}
            <iframe width="750px" height="100%" src={youtubeVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            {/* </div> */}
        </div>
    )

}
Video.defaultProps = {
    className: "Player",
    video: ""
}
