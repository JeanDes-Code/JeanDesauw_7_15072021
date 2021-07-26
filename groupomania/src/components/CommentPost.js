import { useState } from "react";
import { useParams} from 'react-router-dom'
import getComs from "../services/getCom-request";

//service Post com
import postRequest from "../services/post-request";

function CommentPost ({setCommentList}) {
    const [isOpen, setIsOpen] = useState(false)
    const {id} = useParams()

    const [newCom, setNewCom] = useState({
        commentaire: "",
        author: "",
    });

    const submitComment = async (newCom) => {
        if (
            newCom.content === "" ||
            newCom.author === ""
          ) {
            alert("Vous ne pouvez pas publier un commentaire vide !");
          } else {
                console.log(newCom, "publié !")
                await postRequest(newCom, id)
                setTimeout(() => {
                    getComs(id, {setCommentList})
                }, 100)
                setIsOpen(false)
          }
    };
    

    return isOpen ? (
    <>  
        <span className="border"></span>   
        <button className="btn" onClick={() => setIsOpen(false)}> Fermer l'onglet </button>
        <div className="form-comment">
            <h2>Publier un commentaire : </h2>
            <textarea
                type="text"
                name="content"
                placeholder="Commentaire"
                onChange={(e) => {
                setNewCom({ ...newCom, commentaire: e.target.value });
                }}
            />
            <label className="form-comment-author"> Auteur du commentaire : </label>
            <input
                type="text"
                name="author"
                placeholder="Auteur"
                onChange={(e) => {
                setNewCom({ ...newCom, author: e.target.value });
                }}
            />
            <button
                className="btn submit-comment"
                onClick={() => {
                submitComment(newCom);
                }}
            >
                {" "}
                Publier{" "}
            </button>
        </div>
    </>
    ) :( 
        <button className="btn" onClick={() => setIsOpen(true)}> Publier un commentaire </button>
    );
}

export default CommentPost