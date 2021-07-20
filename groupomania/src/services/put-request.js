import Axios from "axios";

const putRequest = (id, modifiedArticle) => {
  Axios.put(`http://localhost:3001/api/update/article/${id}`, {
    modifiedArticle,
  });
};

export default putRequest;
