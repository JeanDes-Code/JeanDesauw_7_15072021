function ArticleItem({ id, title, content, author, file }) {
    return (
            <div key={id} className="article-display"> 
                <h2 className="article-display-title"> {title} </h2>
                <img className='article-display-img' src={file} alt={title} />
                <p> {content} </p>
                <h3 className="article-display-author">
                    Publié par {author}{" "}
                </h3>
            </div>
    )
}

export default ArticleItem
