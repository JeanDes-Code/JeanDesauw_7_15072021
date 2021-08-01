import Axios from "axios";

const deleteLike = (id, item) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (item === "like-comment") {
    Axios.delete(`http://localhost:3001/api/like/comment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    Axios.delete(`http://localhost:3001/api/like/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export default deleteLike;
