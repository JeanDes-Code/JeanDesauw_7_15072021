import {useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function Like () {
    const thumbs = <FontAwesomeIcon icon={faThumbsUp} />
    const [likeCount, setLikeCount] = useState(0)
    const countLike = () => {
        setLikeCount(likeCount+1)
    }
    return (
        <div className="like">
            <button className="like-btn" onClick={countLike}>  {thumbs} {likeCount} </button>
        </div>
    )
}
export default Like