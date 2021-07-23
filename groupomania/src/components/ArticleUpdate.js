import { useState } from "react";
import {useHistory} from 'react-router-dom'

//Services
import deleteRequest from "../services/delete-request";
import putRequest from "../services/put-request";
import getOne from "../services/getOne-request";

function ArticleUpdate({ id, setArticle }) {
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false)

    const [modifiedArticle, setModifiedArticle] = useState({
        title: "",
        content: "",
    });

    const deleteArticle = (id) => {
        deleteRequest(id);
        history.push("/")
    };
    
    //DEBUG : trouver une autre méthode pour rafraichir le composant ArticleList (parfois la requête GET se fait avant la fin de la requête PUT)
    const updateArticle = (id, modifiedArticle) => {
        if (modifiedArticle.title === "" || modifiedArticle.content === "") {
          alert("Veuillez remplir tous les champs pour modifier votre article.");
        } else {
          putRequest(id, modifiedArticle);
          setModifiedArticle({ title: "", content: "" });
          getOne(id, {setArticle})
        }
    };
    
    return isOpen ? (
        <>      
                <span className="border"></span>
                <button className="btn btn-hide-article" onClick={() => setIsOpen(false)}> Refermer </button>
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
        <>
            <button className="btn btn-article btn-hide-article" onClick={() => setIsOpen(true)}> Modifier ou supprimer l'article </button>
        </>
    )
}

export default ArticleUpdate
