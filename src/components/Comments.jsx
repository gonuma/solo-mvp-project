import React from 'react'
// import { useEffect } from 'react'
// import axios from "axios";

export default function Comments(props) {
const {selectedVid, 
    // comments
} = props

// const commentLoader = () => {
//     return props.comments.map(comment => {
//         return (
//             <div>{comment.comment}</div>
//             )
//         })
//     }

// useEffect(() => {
//     commentLoader()
// }, [JSON.stringify(comments)])

    return (
        <div>
            <input className="commentInput" placeholder="What do you think?"></input>
            <button onClick={()=>{
                // let newComment = document.getElementsByClassName("commentInput")[0].value;
                // axios.post(`/comments/${selectedVid}/${newComment}`)
                // .then(comments.push({comment: newComment}))
            }
        }>Submit</button>
           <div className="comments">
                {/* {commentLoader()} */}
            </div>
        </div>
    )
}
//TODO create POST request to comments to upload comments