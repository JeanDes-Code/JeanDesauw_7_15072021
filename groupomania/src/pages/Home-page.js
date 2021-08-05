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
    if (response){
      setArticleList(response.data)
    } else {
      return
    }
  }

  useEffect(() => {
    getElements();
  }, []);

  return (
    <div className="homePage page-layout">
      <ActivityBox />
      <ArticleList articleList={articleList} setArticleList={setArticleList} />
    </div>
  );
}

export default Home;
