import { useState, useEffect } from "react";

//Services 
import getArticle from "../services/get-request";

//Components
import ArticleList from "../components/ArticleList";


function Home() {
  const [articleList, setArticleList] = useState([]);

  const getElements = async() => {
    const response = await getArticle()
    setArticleList(response.data)
  }

  useEffect(() => {
    getElements();
  }, []);

  console.log(articleList)
  return (
    <div className="homePage">
      <ArticleList articleList={articleList} setArticleList={setArticleList} />
    </div>
  );
}

export default Home;
