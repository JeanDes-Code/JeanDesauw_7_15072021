import Axios from "axios";

const postRequest = (newArticle, id) => {
  if (newArticle.title !== undefined) {
    Axios.post("http://localhost:3001/api/post/article", newArticle);
  } else {
    Axios.post(`http://localhost:3001/api/commentaires/post/${id}`, newArticle)
  }
};

export default postRequest;
