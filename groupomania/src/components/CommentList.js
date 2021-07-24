import CommentItem from "./CommentItem";
import CommentUpdate from "./CommentUpdate";

const CommentList= ({commentList, setCommentList}) => {

    return (
        <div className="comment-list">
          {commentList.map(({ id, commentaire, author }) => (
              <div key={id} className="comment-card" >
                <CommentItem commentaire={commentaire} author={author} />
                <CommentUpdate id={id} setCommentList={setCommentList} />
              </div>
          ))}
        </div>
    );
}

export default CommentList