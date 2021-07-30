import {useHistory} from 'react-router-dom'

//Composants
import ArticleItem from "./ArticleItem";

function ArticleList({ articleList, setArticleList }) {
  const history = useHistory()
  return (
    <div className="article-list">
      {articleList.map(({ id, title, content, author, file }) => (
          <div key={id} className="card" onClick={() => {history.push(`/${id}`)}}>
            <ArticleItem id={id} title={title} content={content} author={author} file={file} setArticleList={setArticleList}/>
          </div>
      ))}
    </div>
  );
}

export default ArticleList;
