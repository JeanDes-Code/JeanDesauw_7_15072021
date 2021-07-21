//Composants
import ArticleUpdate from "./ArticleUpdate";

function ArticleItem({ id, title, content, author, setArticleList }) {
    return (
        <>
            <div className="article-display"> 
                <h2 className="article-display-title"> {title} </h2>
                <p> {content} </p>
                <h3 className="article-display-author">
                    Publié par {author}{" "}
                </h3>
            </div>
            <div className="article-modification">
            <ArticleUpdate id={id} setArticleList={setArticleList} />
            </div>
        </>
    )
}

export default ArticleItem
