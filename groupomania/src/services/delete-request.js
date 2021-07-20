import Axios from "axios";

const deleteRequest = (id) => {
  Axios.delete(`http://localhost:3001/api/delete/article/${id}`);
};

export default deleteRequest;
