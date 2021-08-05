import { useState } from "react";
import {useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

//Services
import deleteRequest from "../services/delete-request";
import getComs from "../services/getCom-request";
import putRequest from "../services/put-request";

function CommentUpdate({ id, setCommentList }) {
    const publish = <FontAwesomeIcon icon={faEdit} alt="Modifier l'article" />
    const trash = <FontAwesomeIcon icon={faTrashAlt} alt="Supprimer l'article" />
    const item = "commentaire"
    const urlParam = useParams()
    let articleId = urlParam.id

    const [isOpen, setIsOpen] = useState(false)

    const [modifiedComment, setModifiedComment] = useState({
        commentaire: "",
    });

    const deleteComment = async (id) => {
        await deleteRequest(id, articleId, item);
        setTimeout(async() => {
           const response = await getComs(articleId)
           setCommentList(response.data)
          }, 10)
    };
    
    const updateComment = async (id, modifiedComment) => {
        if (modifiedComment.commentaire === "") {
            alert("Vous ne pouvez pas publier un article vide.");
        } else {
            await putRequest(id, modifiedComment, articleId, item);
            setModifiedComment({ commentaire: "" });
            const response = await getComs(articleId)
            setCommentList(response.data)
            setIsOpen(false)
        }
    };
    
    return isOpen ? (
        <>  
            <span className="border"></span>    
            <button className='btn btn-hide' onClick={() => setIsOpen(false)}> Refermer </button>
                <h3> Modifier commentaire  {publish} </h3>
                <form className="form-update">
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
                        className="btn btn-update"
                        onClick={() => {
                        updateComment(id, modifiedComment);
                        }}
                    >
                        Modifier
                    </button>
                </form>
        </>
    ) : (
        <>
            <button className="btn btn-comment btn-hide" onClick={() => setIsOpen(true)}> {publish} </button>
            <button
                        className="btn btn-delete-comment"
                        onClick={() => {
                        deleteComment(id);
                        }}
                    >
                        {trash}
            </button>
        </>
    )
}

export default CommentUpdate