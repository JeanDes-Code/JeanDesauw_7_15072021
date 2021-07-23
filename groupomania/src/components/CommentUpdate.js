import { useState } from "react";
import {useParams} from 'react-router-dom'

//Services
import deleteRequest from "../services/delete-request";
import getComs from "../services/getCom-request";
import putRequest from "../services/put-request";

function CommentUpdate({ id, setCommentList }) {
    const urlParam = useParams()
    let articleId = urlParam.id

    const [isOpen, setIsOpen] = useState(false)

    const [modifiedComment, setModifiedComment] = useState({
        commentaire: "",
    });

    const deleteComment = (id) => {
        const item = "article"
        deleteRequest(id, articleId, item);
        getComs(articleId, {setCommentList})
    };
    
    //DEBUG : trouver une autre méthode pour rafraichir le composant ArticleList (parfois la requête GET se fait avant la fin de la requête PUT)
    const updateComment = (id, modifiedComment) => {
        if (modifiedComment.commentaire === "") {
            alert("Vous ne pouvez pas publier un article vide.");
        } else {
            putRequest(id, modifiedComment, articleId);
            setModifiedComment({ commentaire: "" });
            getComs(id, {setCommentList})
        }
    };
    
    return isOpen ? (
        <>  
            <span className="border"></span>    
            <button className='btn btn-hide' onClick={() => setIsOpen(false)}> Refermer l'onglet modification </button>
                <h3> Modifier le commentaire : </h3>
                <textarea
                    className="newContent updateInput"
                    type="text"
                    placeholder="Nouveau commentaire"
                    onChange={(e) => {
                    setModifiedComment({
                        ...modifiedComment,
                        commentaire: e.target.value,
                    });
                    }}
                />
                <button
                    className="btn"
                    onClick={() => {
                    updateComment(id, modifiedComment);
                    }}
                >
                    Modifier le commentaire
                </button>
                <span className="border"></span>
                <button
                    className="btn"
                    onClick={() => {
                    deleteComment(id);
                    }}
                >
                    Supprimer le commentaire
                </button>
        </>
    ) : (
        <button className="btn btn-comment btn-hide" onClick={() => setIsOpen(true)}> Modifier ou supprimer le commentaire </button>
    )
}

export default CommentUpdate