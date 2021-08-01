import CommentItem from "./CommentItem";
import CommentUpdate from "./CommentUpdate";
import LikeComment from "./LikeComment"

const CommentList= ({commentList, setCommentList, username, role}) => {
  console.log("username : ", username, "role : ", role)
    return (
        <div className="comment-list">
          {commentList.map(({ id, commentaire, author }) => username === author || role === 1 ? (
              <div key={id} className="comment-card" >
                <CommentItem commentaire={commentaire} author={author} />
                <LikeComment id={id} />
                <CommentUpdate id={id} setCommentList={setCommentList} />
              </div>
          ) : (
            <div key={id} className="comment-card" >
              <CommentItem commentaire={commentaire} author={author} />
              <LikeComment id={id} />
            </div>
        )) }
        </div>
    );
}

export default CommentList