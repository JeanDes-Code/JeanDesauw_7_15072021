import Axios from "axios";

const putRequest = (id, data, articleId) => {
  if (data.title !== undefined) {
    Axios.put(`http://localhost:3001/api/update/article/${id}`, {
      data,
    });
  } else {
    Axios.put(`http://localhost:3001/api/commentaires/put/${articleId}/${id}`, {
      data
    })
  }
};

export default putRequest;
