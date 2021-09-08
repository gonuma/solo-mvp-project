import React from 'react'

export default function Video(props) {
let {youtubeVideo, className} = props
    
    return (
        <div className={className}>
            <iframe className="Player" src={youtubeVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    )

}
Video.defaultProps = {
    className: "Tracks",
    video: ""
}
