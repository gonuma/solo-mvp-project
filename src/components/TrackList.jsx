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
                        <div>
        <button className="track">{`${track.group} - ${track.song}`}</button>
        </div>
       )
    })    
}


return (
    <div >
        <div className={props.className}onClick={onClick}>  
        <h1 >Recent Songs</h1>
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