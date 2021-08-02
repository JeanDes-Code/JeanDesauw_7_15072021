import Axios from "axios";

const getComs = (articleId) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  return Axios.get(`http://localhost:3001/api/commentaires/get/${articleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export default getComs