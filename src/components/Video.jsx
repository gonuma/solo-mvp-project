import React from 'react'

const API = "AIzaSyBfPHBlVhS2FknDZr6pxXkKP2NhA-zt0xY";
const result = 1;


export default function Video(props) {
let {video, className} = props
    
    return (
        <div className={props.className}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    )

}
Video.defaultProps = {
    className: "Player",
    video: ""
}