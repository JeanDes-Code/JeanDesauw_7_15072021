//Composants
import ArticleItem from "./ArticleItem";
import ArticleUpdate from "./ArticleUpdate";

function ArticleList({ articleList, setArticleList }) {

  return (
    <div className="article-list">
      {articleList.map(({ id, title, content, author }) => (
          <div key={id} className="card">
            <ArticleItem id={id} title={title} content={content} author={author} />
            <div className="article-modification">
              <ArticleUpdate id={id} setArticleList={setArticleList} />
            </div>
          </div>
        
      ))}
    </div>
  );
}

export default ArticleList;
