import { useEffect, useState } from "react";
import axios from "axios";
import Video from "./Video"


const TrackList = (props) => {
const {
    className,
    youtubeVideo,
    onClick,
    trackList,
} = props


const listUpdater = () => {
            return props.trackList.map((track) => {
                    return (
        <div className="track">{`${track.group} - ${track.song}`}
        {/* <br/>
        <div className="timeStamp">
        {`Posted: ${track.postedAt}`}
        </div> */}
        </div>
       )
    })    
}


return (
    <div >
        <div className={props.className}onClick={onClick}>  
        <h1 >Recent Songs</h1>
        <button onClick={()=> console.log(props.trackList)}>Click Me</button>
        <div className="list">
        {listUpdater()}
            </div> 
        </div>
        <Video youtubeVideo={youtubeVideo}/>
    </div>
)
}

TrackList.defaultProps = {
    className: "Tracks",
    onClick: () => {}
}

export default TrackList;