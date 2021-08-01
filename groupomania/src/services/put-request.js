import Axios from "axios";

const putRequest = (id, data, articleId) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (articleId === "article") {
    Axios.put(`http://localhost:3001/api/update/article/${id}`, data , 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } if (articleId === "user") {
    Axios.put(`http://localhost:3001/api/auth/put`, data , 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }else {
    Axios.put(`http://localhost:3001/api/commentaires/put/${articleId}/${id}`, {data} , 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export default putRequest;
