import Axios from "axios";

const getLikes = (id, { setLikeCount }) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
    Axios.get(`http://localhost:3001/api/like/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
        console.log(response.data);
    });

};

export default getLikes;
