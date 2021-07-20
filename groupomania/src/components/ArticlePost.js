import { useState } from "react";
import getArticle from "../services/get-request";

import postRequest from "../services/post-request";

function ArticlePost({ setArticleList }) {
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    author: "",
  });

  //voir autre méthode pour mettre à jour la liste d'article
  const submitArticle = (newArticle) => {
    if (
      newArticle.title === "" ||
      newArticle.content === "" ||
      newArticle.author === ""
    ) {
      alert("votre article est vide ! Veuillez remplir tous les champs !");
    } else {
      postRequest(newArticle);
      getArticle({ setArticleList });
    }
  };

  return (
    <div className="form">
      <h2>Poster un article : </h2>
      <label> Titre de l'article</label>
      <input
        type="text"
        name="articleTitle"
        onChange={(e) => {
          setNewArticle({ ...newArticle, title: e.target.value });
        }}
      />
      <label> Contenu de l'article </label>
      <textarea
        type="text"
        name="content"
        onChange={(e) => {
          setNewArticle({ ...newArticle, content: e.target.value });
        }}
      />
      <label> Auteur de l'article </label>
      <input
        type="text"
        name="author"
        onChange={(e) => {
          setNewArticle({ ...newArticle, author: e.target.value });
        }}
      />

      <button
        className="btn"
        onClick={() => {
          submitArticle(newArticle);
        }}
      >
        {" "}
        Submit{" "}
      </button>
    </div>
  );
}

export default ArticlePost;
