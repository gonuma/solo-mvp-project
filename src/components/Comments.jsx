import React from 'react'
import { useEffect } from 'react'

export default function Comments(props) {
const {selectedVidId, comments} = props



const commentLoader = () => {
    return props.comments.map(comment => {
        return (
            <div>{comment.comment}</div>
            )
        })
    }
    useEffect(() => {
    }, [])
    return (
        <div>
            <input className="commentInput" placeholder="What do you think?"></input>
            <button onClick={()=>comments.push({comment: document.getElementsByClassName("commentInput")[0].value})}>Submit</button>
            {/* <button type="submit" onClick={console.log(props.comments)}>Click Me</button> */}
            <div className="comments">
            {commentLoader()}
            </div>
        </div>
    )
}
//TODO create POST request to comments to upload comments