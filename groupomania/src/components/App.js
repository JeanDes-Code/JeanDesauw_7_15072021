import { useState, useEffect } from "react";
import '../styles/App.css';


import ArticlePost from './ArticlePost'
import ArticleList from './ArticleList'

function App() {

  const [articleList, setArticleList] = useState([]);
  

  useEffect(() => {
   getArticle()
  }, []);

  const getArticle = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setArticleList(response.data);
    });
  }

  

  return (
    <div className="App">
      <h1>Réseau social d'entreprise - Groupomania </h1>

      <ArticlePost articleList={articleList} setArticleList={setArticleList} />
      <ArticleList articleList={articleList} setArticleList={setArticleList} />
      
    </div>
  );
}

export default App;
