import Axios from "axios";

const putRequest = (id, data, articleId) => {
  console.log(data)
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (articleId === undefined) {
    Axios.put(`http://localhost:3001/api/update/article/${id}`, data , 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    Axios.put(`http://localhost:3001/api/commentaires/put/${articleId}/${id}`, {data} , 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export default putRequest;
