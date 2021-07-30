import LikeComment from "./LikeComment"

const CommentItem = ({ commentaire, author }) => {

    return(
        <>    
            <div className="comment-display">
                <p className="comment-display-text"> {commentaire} </p>
                <h3 className="comment-display-author">
                    Publié par {author}{" "}
                </h3>
                <LikeComment />
            </div>
        </>
    )
}

export default CommentItem