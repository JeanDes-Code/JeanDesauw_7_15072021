import Axios from "axios";

const getLikesReq = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  return await Axios.get(`http://localhost:3001/api/like/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
};

export default getLikesReq;