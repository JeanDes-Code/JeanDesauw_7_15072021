import Axios from "axios";

const getLikesReq = async (id, item) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (item === "like-comment") {
    const commentId = id;
    return await Axios.get(`http://localhost:3001/api/like/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } else {
    return await Axios.get(`http://localhost:3001/api/like/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
};

export default getLikesReq;
