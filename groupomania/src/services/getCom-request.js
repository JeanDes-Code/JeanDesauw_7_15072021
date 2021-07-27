import Axios from "axios";

const getComs = (articleId, {setCommentList}) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
    Axios.get(`http://localhost:3001/api/commentaires/get/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setCommentList(response.data);
    });
}

export default getComs