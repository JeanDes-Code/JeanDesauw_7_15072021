import Axios from "axios";

const deleteRequest = (id, articleId, item) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (item === "commentaire") {
    Axios.delete(`http://localhost:3001/api/commentaires/delete/${articleId}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } 
  if (item === "user") {
    Axios.delete(`http://localhost:3001/api/auth/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  else {
    Axios.delete(`http://localhost:3001/api/delete/article/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export default deleteRequest;
