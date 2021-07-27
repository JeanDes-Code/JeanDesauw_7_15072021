import Axios from "axios";

const getArticle = ({ setArticleList }) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
    Axios.get("http://localhost:3001/api/get/article", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setArticleList(response.data);
    });

};

export default getArticle;
