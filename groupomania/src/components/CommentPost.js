import { useState } from "react";
import { useParams} from 'react-router-dom'
import getComs from "../services/getCom-request";

//service Post com
import postRequest from "../services/post-request";

function CommentPost ({setCommentList}) {
    const [isOpen, setIsOpen] = useState(false)
    const {id} = useParams()

    const [newCom, setNewCom] = useState({
        commentaire: ""
    });

    const item ="comment"

    const submitComment = async (newCom) => {
        if (
            newCom.content === ""
          ) {
            alert("Vous ne pouvez pas publier un commentaire vide !");
          } else {
                console.log("Commentaire publié !")
                await postRequest(newCom, id, item)
                setTimeout( async () => {
                    const response = await getComs(id)
                    setCommentList(response.data)
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