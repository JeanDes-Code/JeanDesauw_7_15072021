import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//Services
import deleteRequest from "../services/delete-request";
import putRequest from "../services/put-request";
import getOne from "../services/getOne-request";

function ArticleUpdate({ id, setArticle, setUsername, setRole }) {
  const publish = <FontAwesomeIcon icon={faEdit} alt="Modifier l'article" />;
  const trash = <FontAwesomeIcon icon={faTrashAlt} alt="Supprimer l'article" />;
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newFile, setNewFile] = useState(null);

  const deleteArticle = async (id) => {
    await deleteRequest(id);
    setTimeout(() => {
      history.push(`/`);
    }, 10);
  };

  const updateArticle = async (e) => {
    const articleId = "article";
    e.preventDefault();
    if (newTitle === "" || newContent === "") {
      alert("Veuillez remplir tous les champs pour modifier votre article.");
    } else {
      const data = new FormData();
      data.append("title", newTitle);
      data.append("content", newContent);
      data.append("file", newFile);
      await putRequest(id, data, articleId);
      setNewTitle("");
      setNewContent("");
      setNewFile(null);
      setTimeout(async () => {
        const response = await getOne(id);
        setArticle(response.data.result);
        setUsername(response.data.username);
        setRole(response.data.role);
      }, 100);
      setIsOpen(false);
    }
  };

  return isOpen ? (
    <>
      <span className="border"></span>
      <button className="btn btn-hide-article" onClick={() => setIsOpen(false)}>
        {" "}
        Refermer{" "}
      </button>
      <h3> Modifier l'article {publish} </h3>
      <form className="form-update" encType="multipart/form-data">
        <div className="article-modification-title">
          <input
            className="newTitle updateInput"
            type="text"
            placeholder="Nouveau titre"
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
        </div>

        <textarea
          className="newContent updateInput"
          type="text"
          placeholder="Nouveau contenu"
          onChange={(e) => {
            setNewContent(e.target.value);
          }}
        />
        <label> Ajouter une image / un gif </label>
        <input
          id="file"
          type="file"
          className="file-upload-update"
          accept=".jpg, .jpeg, .png, .gif, .bmp"
          onChange={(e) => {
            setNewFile(e.target.files[0]);
          }}
        />
        <button className="btn btn-update" onClick={updateArticle}>
          Modifier
        </button>
      </form>
    </>
  ) : (
    <>
      <button
        className="btn btn-article btn-hide-article"
        onClick={() => setIsOpen(true)}
      >
        {" "}
        {publish}{" "}
      </button>
      <button
        className="btn btn-delete-article"
        onClick={() => {
          deleteArticle(id);
        }}
      >
        {trash}
      </button>
    </>
  );
}

export default ArticleUpdate;
