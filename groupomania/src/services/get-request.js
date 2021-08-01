import Axios from "axios";

const getArticle = () => {
  const token = JSON.parse(localStorage.getItem("token")).value;
    return Axios.get("http://localhost:3001/api/get/article", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
};

export default getArticle;
