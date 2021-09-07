import { useEffect, useState } from "react";
import axios from "axios";
import Video from "./Video"


const TrackList = (props) => {
const {
    className,
    onClick,
    trackList,
} = props

let [video, setVideo] = useState(``);

const listUpdater = () => {
            return props.trackList.map((track) => {
                    return (
        <div>{`${track.group} - ${track.song}`}</div>
       )
    })    
}


return (
    <div > 
        <div className={props.className}onClick={onClick}>  
        <h1 onClick={()=>setVideo(`https://www.youtube.com/watch?v=1w7OgIMMRc4`)}>Recent Songs</h1>
        {listUpdater()}
        </div>
        <Video video={video}/>
    </div>
)
}

TrackList.defaultProps = {
    className: "Tracks",
    onClick: () => {}
}

export default TrackList;