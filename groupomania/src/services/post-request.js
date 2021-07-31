import Axios from "axios";

const postRequest = (data, id, item) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (item === "comment") {
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
  
  if (item === "like") {
    Axios.post("http://localhost:3001/api/like/", data , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  
  if (item === "like-comment") {
    Axios.post("http://localhost:3001/api/like/comment/", data , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  
  if (item === "article") {
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
    console.log("Une erreur s'est produite, veuillez réessayez ultérieurement.")
  }
};

export default postRequest;

