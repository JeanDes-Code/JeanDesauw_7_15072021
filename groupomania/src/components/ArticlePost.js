import { useState } from "react";
import Axios from "axios";

function ArticlePost ( {articleList, setArticleList} ) {

    const [articleTitle, setArticleTitle] = useState("");
    const [articleContent, setArticleContent] = useState("");
    const [articleAuthor, setArticleAuthor] = useState("");

    const submitArticle = () => {
        Axios.post("http://localhost:3001/api/insert", {
          articleTitle: articleTitle,
          articleContent: articleContent,
          articleAuthor: articleAuthor,
        }).then((res) => {
          console.log(res)
          setArticleList([
            ...articleList,res.data,
          ]);
        })
      };

    return (
        <div className="form">
            <h2>Poster un article : </h2>
            <label> Titre de l'article</label>
            <input type="text" name="articleTitle" onChange={(e) => {setArticleTitle(e.target.value);}}/>
            <label> Contenu de l'article </label>
            <textarea type="text" name="content" onChange={(e) => {setArticleContent(e.target.value);}}/>
            <label> Auteur de l'article </label>
            <input type="text" name="author" onChange={(e) => {setArticleAuthor(e.target.value);}}/>

            <button className="btn" onClick={submitArticle}> Submit </button>
      </div>
    )
}

export default ArticlePost
