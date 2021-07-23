import Axios from "axios";

const deleteRequest = (id, articleId, item) => {
  if (item === "article") {
    Axios.delete(`http://localhost:3001/api/commentaires/delete/${articleId}/${id}`)
  } else {
    Axios.delete(`http://localhost:3001/api/delete/article/${id}`);
  }
};

export default deleteRequest;
