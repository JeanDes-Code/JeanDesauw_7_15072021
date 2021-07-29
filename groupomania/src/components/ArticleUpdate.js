import { useState } from "react";
import {useHistory} from 'react-router-dom'

//Services
import deleteRequest from "../services/delete-request";
import putRequest from "../services/put-request";
import getOne from "../services/getOne-request";

function ArticleUpdate({ id, setArticle, setUsername, setRole }) {
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false)

    const [newTitle,setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newFile, setNewFile] = useState(null)

    const deleteArticle = async (id) => {
        await deleteRequest(id);
        setTimeout(() => {            history.push(`/`);
          }, 10)
    };
    
    //DEBUG : trouver une autre méthode pour rafraichir le composant ArticleList (parfois la requête GET se fait avant la fin de la requête PUT)
    const updateArticle = async (e) => {
        e.preventDefault()
        if (newTitle === "" || newContent === "") {
          alert("Veuillez remplir tous les champs pour modifier votre article.");
        } else {
            //console.log(newTitle, newContent, newFile)
            const data = new FormData();
            data.append("title", newTitle);
            data.append("content", newContent);
            data.append("file", newFile);

            await putRequest(id, data);

            setNewTitle("");
            setNewContent("")
            setNewFile(null)
            setTimeout(() => {
                getOne(id, {setArticle, setUsername, setRole})
            }, 100);
            setIsOpen(false);
        }
    };
    
    return isOpen ? (
        <>      
                <span className="border"></span>
                <button className="btn btn-hide-article" onClick={() => setIsOpen(false)}> Refermer </button>
                <h3> Modifier l'article : </h3>
                <form className="form-update" encType="multipart/form-data">
                    <div className="article-modification-title">
                        <input
                        className="newTitle updateInput"
                        type="text"
                        placeholder="Nouveau titre"
                        onChange={(e) => {
                            setNewTitle( e.target.value )}}
                        />
                    </div>

                    <textarea
                        className="newContent updateInput"
                        type="text"
                        placeholder="Nouveau contenu"
                        onChange={(e) => {
                            setNewContent( e.target.value )}}
                    />
                    <label> Ajouter une image / un gif  </label>
                    <input
                        id="file"
                        type="file"
                        className="file-upload-update"
                        accept=".jpg, .jpeg, .png, .gif, .bmp"
                        onChange={(e) => {
                            setNewFile( e.target.files[0] )}}
                    />
                    <button
                        className="btn btn-update"
                        onClick={
                            updateArticle
                        }
                    >
                        Modifier l'article
                    </button>
                </form>

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
