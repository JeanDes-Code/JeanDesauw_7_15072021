import { useParams} from 'react-router-dom'
import {useState, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import postRequest from '../services/post-request'
import getLikesReq from '../services/getLike-request'
import deleteLike from '../services/deleteLike-request'

function Like () {
    const item = "like";
    const {id} = useParams()
    
    const thumbs = <FontAwesomeIcon icon={faThumbsUp} />
    const [likeCount, setLikeCount] = useState(0)
    const [alreadyLiked, setAlreadyLiked] = useState(Boolean)

    const getLikecount = async(id) => {
        const response = await getLikesReq(id)
        setLikeCount(response.data.count)
        setAlreadyLiked(response.data.alreadyLiked)
    }
    console.log(likeCount, alreadyLiked)
    useEffect(() => {
       getLikecount(id);
    },[id]); 

    const updateLike = () => {
        console.log(likeCount, alreadyLiked)
        if (alreadyLiked === false) {
            setLikeCount(likeCount+1)
        } else {
            setLikeCount(likeCount-1)
        }
        
    }

    const like = (e) => {
        e.preventDefault();
        if (alreadyLiked === false) {
            const data = {ArticleId : id}
            postRequest(data, id, item)
            updateLike()
            setAlreadyLiked(true)
        } else {
            deleteLike(id);
            updateLike()
            setAlreadyLiked(false)
        }   
    }
    
    return (
        <div className="like">
            <button className="like-btn" onClick={like}>  {thumbs} {likeCount} </button>
        </div>
    )
}
export default Like