import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";

export default function Comments(props) {
let {selectedVid, comments} = props

const commentLoader = () => {
    axios
    .get(`/comments/${selectedVid}`)
    .then((res) => comments = res.data);
    console.log(comments)
    return props.comments.map(comment => {
        return (
            <div>{comment.comment}</div>
            )
        })
    }
    

    return (
        <div>
            <input className="commentInput" placeholder="What do you think?"></input>
            <button onClick={()=>{
                let newComment = document.getElementsByClassName("commentInput")[0].value;
                comments.push(newComment)
                axios.post(`/comments/${selectedVid}/${newComment}`)
                .then(comments.push({comment: newComment})).then(document.getElementsByClassName("commentInput")[0].value = null)            
                commentLoader()
            }
        }>Submit</button>
           <div className="comments">
                {commentLoader()}
            </div>
        </div>
    )
}
//TODO create POST request to comments to upload comments