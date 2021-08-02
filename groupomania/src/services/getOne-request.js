import Axios from "axios";


const getOne = (id, item) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (item === "user") {
    return Axios.get(`http://localhost:3001/api/auth/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }else {
    return Axios.get(`http://localhost:3001/api/get/article/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })}
};

export default getOne;
