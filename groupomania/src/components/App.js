import { useState, useEffect } from "react";
import "../styles/App.css";

import getArticle from "../services/get-request";

import ArticlePost from "./ArticlePost";
import ArticleList from "./ArticleList";

function App() {
  const [articleList, setArticleList] = useState([]);
  console.log(articleList);

  useEffect(() => {
    getArticle({ setArticleList });
  }, []);

  return (
    <div className="App">
      <h1>Réseau social d'entreprise - Groupomania </h1>

      <ArticlePost articleList={articleList} setArticleList={setArticleList} />
      <ArticleList articleList={articleList} setArticleList={setArticleList} />
    </div>
  );
}

export default App;
