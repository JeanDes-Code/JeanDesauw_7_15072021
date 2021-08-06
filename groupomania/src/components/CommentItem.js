const CommentItem = ({ commentaire, author }) => {
  return (
    <>
      <div className="comment-display">
        <p className="comment-display-text"> {commentaire} </p>
        <h3 className="comment-display-author">Publié par {author} </h3>
      </div>
    </>
  );
};

export default CommentItem;
