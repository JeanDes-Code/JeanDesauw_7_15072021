import { useState } from "react";
import {useHistory} from 'react-router-dom'

import postRequest from "../services/post-request";

function ArticlePost() {
  const item ='article'
  const history = useHistory()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null)
  
  //voir autre méthode pour mettre à jour la liste d'article
  const submitArticle = async (e) => {
    e.preventDefault()
    if (
      title === "" ||
      content === ""
    ) {
      alert("votre article est vide ! Veuillez remplir tous les champs !");
    } else {
      const data = new FormData();
      const id = null;
      data.append("title", title);
      data.append("content", content);
      data.append("file", file);
      await postRequest(data, id, item);
      setTimeout(() => {
        history.push(`/`);
      }, 100)
    }
  };

  return (
    <form className="form articlePost" encType="multipart/form-data">
      <h2>Poster un article : </h2>
      <label> Titre de l'article</label>
      <input
        type="text"
        name="articleTitle"
        onChange={(e) => {
          setTitle( e.target.value )}}
      />
      <label> Contenu de l'article </label>
      <textarea
        type="text"
        name="content"
        onChange={(e) => {
          setContent( e.target.value )}}
      />
      <label> Ajouter une image / un gif  </label>
      <input
        id="file"
        type="file"
        className="file-upload"
        accept=".jpg, .jpeg, .png, .gif, .bmp"
        onChange={(e) => {
            setFile( e.target.files[0] )}}
      />
 
      <button
        className="btn"
        onClick={
          submitArticle
        }
      >
        {" "}
        Submit{" "}
      </button>
    </form>
  );
}

export default ArticlePost;
