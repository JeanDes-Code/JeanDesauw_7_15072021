import { useState } from "react";
import { useParams} from 'react-router-dom'

//service Post com
import postRequest from "../services/post-request";

function CommentPost () {
    const {id} = useParams()

    const [newCom, setNewCom] = useState({
        commentaire: "",
        author: "",
    });

    const submitComment = (newCom) => {
        if (
            newCom.content === "" ||
            newCom.author === ""
          ) {
            alert("Vous ne pouvez pas publier un commentaire vide !");
          } else {
                console.log(newCom, "publié !")
                postRequest(newCom, id)
          }
    };
    

    return(
        <div className="form">
            <h2>Publier un commentaire : </h2>
            <label> Contenu du commentaire </label>
            <textarea
                type="text"
                name="content"
                onChange={(e) => {
                setNewCom({ ...newCom, commentaire: e.target.value });
                }}
            />
            <label> Auteur du commentaire </label>
            <input
                type="text"
                name="author"
                onChange={(e) => {
                setNewCom({ ...newCom, author: e.target.value });
                }}
            />
            <button
                className="btn"
                onClick={() => {
                submitComment(newCom);
                }}
            >
                {" "}
                Publier{" "}
            </button>
        </div>
    );
}

export default CommentPost