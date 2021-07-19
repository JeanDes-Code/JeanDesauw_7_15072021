import { useState } from "react";
import Axios from "axios";

function ArticlePost ( {articleList, setArticleList} ) {
    const [newArticle, setNewArticle] = useState({title: '', content: '', author: ''})

    const submitArticle = () => {
        Axios.post("http://localhost:3001/api/insert", {newArticle}).then((res) => {
          setArticleList([
            ...articleList,res.data,
          ]);
        })
      };

    return (
        <div className="form">
            <h2>Poster un article : </h2>
            <label> Titre de l'article</label>
            <input type="text" name="articleTitle" onChange={(e) => {setNewArticle({...newArticle, title: e.target.value});}}/>
            <label> Contenu de l'article </label>
            <textarea type="text" name="content" onChange={(e) => {setNewArticle({...newArticle, content: e.target.value});}}/>
            <label> Auteur de l'article </label>
            <input type="text" name="author" onChange={(e) => {setNewArticle({...newArticle, author: e.target.value});}}/>

            <button className="btn" onClick={submitArticle}> Submit </button>
      </div>
    )
}

export default ArticlePost
