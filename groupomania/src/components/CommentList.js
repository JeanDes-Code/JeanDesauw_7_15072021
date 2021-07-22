const CommentList= ({commentList}) => {

    return (
        <div className="comment-list">
          {commentList.map(({ id, commentaire, author }) => (
              <div key={id} className="comment-card" >
                <p> {commentaire} </p>
                <h3 className="article-display-author">
                    Publié par {author}{" "}
                </h3>
              </div>
          ))}
        </div>
    );
}

export default CommentList