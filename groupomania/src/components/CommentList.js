import CommentUpdate from "./CommentUpdate";

const CommentList= ({commentList, setCommentList}) => {

    return (
        <div className="comment-list">
          {commentList.map(({ id, commentaire, author }) => (
              <div key={id} className="comment-card" >
                <p> {commentaire} </p>
                <h3 className="article-display-author">
                    Publié par {author}{" "}
                </h3>
                <CommentUpdate id={id} setCommentList={setCommentList} />
              </div>
          ))}
        </div>
    );
}

export default CommentList