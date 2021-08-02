import {useHistory} from 'react-router-dom'

//Composants
import ArticleItem from "./ArticleItem";

function ArticleList({ articleList, setArticleList }) {
  const history = useHistory()

  //on affiche les dernieres publications en premier (en se basant sur l'id de l'article)
  const articles = [].concat(articleList)
  articles.sort((a, b) => b.id - a.id )

  return (
    <div className="article-list">
      {articles.map(({ id, title, content, author, file }) => (
          <div key={id} className="card" onClick={() => {history.push(`/${id}`)}}>
            <ArticleItem id={id} title={title} content={content} author={author} file={file} setArticleList={setArticleList}/>
          </div>
      ))}
    </div>
  );
}

export default ArticleList;
