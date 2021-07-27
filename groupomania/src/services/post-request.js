import Axios from "axios";

const postRequest = (newArticle, id) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (newArticle.title !== undefined) {
    Axios.post("http://localhost:3001/api/post/article" , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }, newArticle);
  } else {
    Axios.post(`http://localhost:3001/api/commentaires/post/${id}` , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }, newArticle)
  }
};

export default postRequest;
