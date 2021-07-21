import { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'

//Services 
import getArticle from "../services/get-request";

//Components
import ArticleList from "./ArticleList";


function Home() {
  const [articleList, setArticleList] = useState([]);
  let history = useHistory()

  useEffect(() => {
    getArticle({ setArticleList });
  }, []);

  return (
    <div className="App">
      <h1>Réseau social d'entreprise - Groupomania </h1>
      <button onClick={() => {history.push('/post')}}> Publier un article </button>
      <ArticleList articleList={articleList} setArticleList={setArticleList} />
    </div>
  );
}

export default Home;
