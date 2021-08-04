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

    const submitComment = async () => {
        const response = await postRequest(newCom, id, item)
        if (response) {
            const response = await getComs(id)
            setCommentList(response.data)
            setIsOpen(false)
        } else {return}
    };
    

    return isOpen ? (
    <>  
        <span className="border"></span>   
        <button className="btn" onClick={() => setIsOpen(false)}> Fermer l'onglet </button>
        <form className="form-comment" onSubmit={submitComment}>
            <h2>Publier un commentaire : </h2>
            <textarea
                type="text"
                name="content"
                placeholder="Commentaire"
                required
                onChange={(e) => {
                setNewCom({ ...newCom, commentaire: e.target.value });
                }}
            />
            <input
                type="submit"
                className="btn submit-comment"
                value="Commenter"
            />
        </form>
    </>
    ) :( 
        <button className="btn btn-comment-panel" onClick={() => setIsOpen(true)}> Commenter </button>
    );
}

export default CommentPost