import { useState } from "react";
import {useHistory} from 'react-router-dom'

import postRequest from "../services/post-request";

function ArticlePost() {
  const history = useHistory()
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    file: ""
  });

  //voir autre méthode pour mettre à jour la liste d'article
  const submitArticle = async (newArticle) => {
    if (
      newArticle.title === "" ||
      newArticle.content === ""
    ) {
      alert("votre article est vide ! Veuillez remplir tous les champs !");
    } else {
      console.log(newArticle)
      await postRequest(newArticle);
      setTimeout(() => {
        history.push(`/`);
      }, 10)
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
      <label> Ajouter une image / un gif  </label>
      <input
        className='input-upload'
        type="file"
        name="image"
        onChange={(e) => {
          setNewArticle({ ...newArticle, file: e.target.value });
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
