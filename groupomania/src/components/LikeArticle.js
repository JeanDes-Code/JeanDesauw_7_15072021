import { useParams} from 'react-router-dom'
import {useState, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import postRequest from '../services/post-request'
import getLikes from '../services/getLike-request'

function Like () {
    const item = "like";
    const {id} = useParams()
    
    const thumbs = <FontAwesomeIcon icon={faThumbsUp} />
    const [likeCount, setLikeCount] = useState(0)

    useEffect(() => {
        getLikes(id, {setLikeCount})
    }, [id]); 
    
    const countLike = () => {
        const data = {
            ArticleId : id
        }
        postRequest(data, id, item)
        setLikeCount(likeCount+1)
    }
    return (
        <div className="like">
            <button className="like-btn" onClick={countLike}>  {thumbs} {likeCount} </button>
        </div>
    )
}
export default Like