import Axios from "axios";

const putRequest = (id, data, articleId, item) => {
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
  }if (item === 'commentaire') {
    Axios.put(`http://localhost:3001/api/commentaires/put/${articleId}/${id}`, data , 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }else {
    console.log("Une erreur est survenue lors de la requête.")
    return
  }
};

export default putRequest;
