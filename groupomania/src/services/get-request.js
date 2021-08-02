import Axios from "axios";

const getArticle = (item) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (item === "getComments") {
    return Axios.get("http://localhost:3001/api/commentaires/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } else {
      return Axios.get("http://localhost:3001/api/get/article", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })}
};

export default getArticle;
