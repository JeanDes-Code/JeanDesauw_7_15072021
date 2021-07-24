import {useHistory} from 'react-router-dom'

//Composants
import ArticleItem from "./ArticleItem";

function ArticleList({ articleList, setArticleList }) {
  const history = useHistory()
  return (
    <div className="article-list">
      {articleList.map(({ id, title, content, author }) => (
          <div key={id} className="card" onClick={() => {history.push(`/${id}`)}}>
            <ArticleItem id={id} title={title} content={content} author={author} setArticleList={setArticleList}/>
          </div>
      ))}
    </div>
  );
}

export default ArticleList;
