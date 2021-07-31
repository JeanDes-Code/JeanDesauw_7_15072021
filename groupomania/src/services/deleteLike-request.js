import Axios from "axios";

const deleteLike = (id) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
    Axios.delete(`http://localhost:3001/api/like/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
};

export default deleteLike;
