import React from 'react'


// const API = "AIzaSyDTlAN8Wbd6CyQKeGJs6S8UY3eOZbSJlj8";
// const resultLimit = 1;

export default function Video(props) {
let {youtubeVideo, className} = props
    
    return (
        <div className="Tracks">
            <iframe width="750px" height="100%" src={youtubeVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    )

}
Video.defaultProps = {
    className: "Player",
    video: ""
}
