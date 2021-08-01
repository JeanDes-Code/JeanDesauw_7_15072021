

function ArticleItem({ id, title, content, author, file }) {
    console.log(file)
    return (
            <div className="article-display"> 
                <h2 className="article-display-title"> {title} </h2>
                <img className='article-display-img' src={file} alt={file} />
                <p> {content} </p>
                <h3 className="article-display-author">
                    Publié par {author}{" "}
                </h3>
            </div>
    )
}

export default ArticleItem
