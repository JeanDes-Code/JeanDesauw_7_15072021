import Axios from "axios";

const postRequest = (data, id) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (id === undefined) {
    console.log(data)
    Axios.post("http://localhost:3001/api/post/article", data , {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error);
    });
  } else {
    Axios.post(`http://localhost:3001/api/commentaires/post/${id}` , data , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error);
    })
  }
};

export default postRequest;
