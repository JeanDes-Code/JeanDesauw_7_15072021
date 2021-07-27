import { useState, useEffect } from "react";

//Services 
import getArticle from "../services/get-request";

//Components
import ArticleList from "../components/ArticleList";


function Home() {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    getArticle({ setArticleList });
  }, []);

  return (
    <div className="App">
      <ArticleList articleList={articleList} setArticleList={setArticleList} />
    </div>
  );
}

export default Home;
