import { useState, useEffect } from "react";

//Services 
import getArticle from "../services/get-request";

//Components
import ArticleList from "../components/ArticleList";
import ActivityBox from "../components/Activity-box";

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
    <div className="homePage page-layout">
      <ArticleList articleList={articleList} setArticleList={setArticleList} />
      <ActivityBox />
    </div>
  );
}

export default Home;
