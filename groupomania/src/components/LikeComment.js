import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import postRequest from '../services/post-request'
import getLikesReq from '../services/getLike-request'
import deleteLike from '../services/deleteLike-request'

function Like ({id}) {
    const item = "like-comment";
    const thumbs = <FontAwesomeIcon icon={faThumbsUp} />
    const [likeCount, setLikeCount] = useState(0)
    const [alreadyLiked, setAlreadyLiked] = useState(Boolean)
    

    const getLikecount = async(id, item) => {
        const response = await getLikesReq(id, item)
        if (response) {
            setLikeCount(response.data.count)
            setAlreadyLiked(response.data.alreadyLiked)
        }
    }

    useEffect(() => {
       getLikecount(id, item);
    },[id]); 

    const updateLike = () => {
        if (alreadyLiked === false) {
            setLikeCount(likeCount+1)
        } else {
            setLikeCount(likeCount-1)
        }
        
    }

    const like = (e) => {
        e.preventDefault();
        if (alreadyLiked === false) {
            const data = {commentId : id}
            postRequest(data, id, item)
            updateLike()
            setAlreadyLiked(true)
        } else {
            deleteLike(id, item);
            updateLike()
            setAlreadyLiked(false)
        }   
    }

    return (
        <div className="like">
            <button className="likeComment-btn" onClick={like}>  {thumbs} {likeCount} </button>
        </div>
    )
}
export default Like