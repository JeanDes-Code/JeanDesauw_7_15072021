import Axios from "axios";


const getOne = (id) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  return Axios.get(`http://localhost:3001/api/get/article/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
};

export default getOne;
