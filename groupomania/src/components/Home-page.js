import { useState, useEffect } from "react";

//Style
import "../styles/App.css";

//Services 
import getArticle from "../services/get-request";

//Components
import ArticleList from "./ArticleList";


function Home() {
  const [articleList, setArticleList] = useState([]);
  console.log(articleList);

  useEffect(() => {
    getArticle({ setArticleList });
  }, []);

  return (
    <div className="App">
      <h1>Réseau social d'entreprise - Groupomania </h1>
      <ArticleList articleList={articleList} setArticleList={setArticleList} />
    </div>
  );
}

export default Home;
