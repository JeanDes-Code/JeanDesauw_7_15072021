import Axios from "axios";

const postRequest = (newArticle, id) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (newArticle.title !== undefined) {
    Axios.post("http://localhost:3001/api/post/article", newArticle , {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  } else {
    Axios.post(`http://localhost:3001/api/commentaires/post/${id}` , newArticle , {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
};

export default postRequest;
