import { useState } from "react";

import getArticle from "../services/get-request";
import deleteRequest from "../services/delete-request";
import putRequest from "../services/put-request";

function ArticleList({ articleList, setArticleList }) {
  const [modifiedArticle, setModifiedArticle] = useState({
    title: "",
    content: "",
  });

  const deleteArticle = (id) => {
    deleteRequest(id);
    getArticle({ setArticleList });
  };

  //DEBUG : trouver une autre méthode pour rafraichir le composant ArticleList (parfois la requête GET se fait avant la fin de la requête PUT)
  const updateArticle = (id, modifiedArticle) => {
    if (modifiedArticle.title === "" || modifiedArticle.content === "") {
      alert("Veuillez remplir tous les champs pour modifier votre article.");
    } else {
      putRequest(id, modifiedArticle);
      setModifiedArticle({ title: "", content: "" });
      getArticle({ setArticleList });
    }
  };

  return (
    <div className="article-list">
      {articleList.map((article, index) => {
        return (
          <div key={`${article}-${index}`} className="card">
            <div className="article-display">
              <h2 className="article-display-title"> {article.title} </h2>
              <p> {article.content} </p>
              <h3 className="article-display-author">
                Publié par {article.author}{" "}
              </h3>
            </div>

            <div className="article-modification">
              <span className="border"></span>
              <h3> Modifier l'article : </h3>

              <div className="article-modification-title">
                <label> Nouveau titre :</label>
                <input
                  className="newTitle updateInput"
                  type="text"
                  placeholder="Nouveau titre"
                  onChange={(e) => {
                    setModifiedArticle({
                      ...modifiedArticle,
                      title: e.target.value,
                    });
                  }}
                />
              </div>

              <label> Nouveau corps de l'article </label>
              <textarea
                className="newContent updateInput"
                type="text"
                placeholder="Nouveau contenu"
                onChange={(e) => {
                  setModifiedArticle({
                    ...modifiedArticle,
                    content: e.target.value,
                  });
                }}
              />
              <button
                className="btn"
                onClick={() => {
                  updateArticle(article.id, modifiedArticle);
                }}
              >
                Modifier l'article
              </button>
              <span className="border"></span>
              <button
                className="btn"
                onClick={() => {
                  deleteArticle(article.id);
                }}
              >
                Supprimer l'article
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ArticleList;
