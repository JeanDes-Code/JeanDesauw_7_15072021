import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
//Services
import postRequest from "../services/post-request";

function ArticlePost() {
  const publish = <FontAwesomeIcon icon={faEdit} alt="Publier un article" />;
  const item = "article";
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  //voir autre méthode pour mettre à jour la liste d'article
  const submitArticle = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const data = new FormData();
    const id = null;
    data.append("title", title);
    data.append("content", content);
    data.append("file", file);
    let response;
    try {
       response = await postRequest(data, id, item);
    } catch (error) {
      const { response } = error;
   if({ response }) {
      setErrorMessage(response.data);
    }else {
      setErrorMessage("Une erreur s'est produite.")
      return;
    }} finally {
      if (response) {
        setTimeout(() => {
          history.push(`/`);
        }, 200);
      }
    }
  };

  return (
    <form
      className="form articlePost"
      encType="multipart/form-data"
      onSubmit={submitArticle}
    >
      <h2>Poster un article {publish} </h2>
      {errorMessage ? <p className="errorMessage">{errorMessage}</p> : null}
      <label> Titre de l'article</label>
      <input
        type="text"
        name="articleTitle"
        minLength="3"
        maxLength="45"
        required
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label> Contenu de l'article </label>
      <textarea
        type="text"
        name="content"
        minLength="0"
        maxLength="65000"
        required
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <label> Ajouter une image / un gif </label>
      <input
        id="file"
        type="file"
        className="file-upload"
        accept=".jpg, .jpeg, .png, .gif, .bmp"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />

      <input type="submit" className="btn" value="Publier" />
    </form>
  );
}

export default ArticlePost;
