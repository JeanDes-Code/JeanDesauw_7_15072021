//Composants
import ArticleItem from "./ArticleItem";

function ArticleList({ articleList, setArticleList }) {

  return (
    <div className="article-list">
      {articleList.map(({ id, title, content, author }) => (
          <div key={id} className="card" >
            <ArticleItem id={id} title={title} content={content} author={author} setArticleList={setArticleList}/>
          </div>
        
      ))}
    </div>
  );
}

export default ArticleList;
