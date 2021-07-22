import Axios from "axios";

const getComs = (articleId, {setCommentList}) => {
    Axios.get(`http://localhost:3001/api/commentaires/get/${articleId}`).then((response) => {
      setCommentList(response.data);
    });
}

export default getComs