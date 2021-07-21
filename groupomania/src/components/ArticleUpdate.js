import { useState } from "react";

//Services
import getArticle from "../services/get-request";
import deleteRequest from "../services/delete-request";
import putRequest from "../services/put-request";


function ArticleUpdate({ id, setArticleList }) {

    const [isOpen, setIsOpen] = useState(false)

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
    
    return isOpen ? (
        <>  
            <button onClick={() => setIsOpen(false)}> Fermer </button>
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
                    updateArticle(id, modifiedArticle);
                    }}
                >
                    Modifier l'article
                </button>
                <span className="border"></span>
                <button
                    className="btn"
                    onClick={() => {
                    deleteArticle(id);
                    }}
                >
                    Supprimer l'article
                </button>
        </>
    ) : (
        <button onClick={() => setIsOpen(true)}> Modifier Article </button>
    )
}

export default ArticleUpdate
