import Axios from "axios";

const deleteRequest = (id, articleId, item) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (item === "commentaire") {
    Axios.delete(
      `http://localhost:3001/api/commentaires/delete/${articleId}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).catch(function (error) {
      if (error.response) {
        const errorRes =
          "The request was made and the server responded with a status code that falls out of the range of 2xx";
        console.log(errorRes);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        const errorReq = "The request was made but no response was received.";
        console.log(errorReq);
        console.log(error.request);
      } else {
        const errorAlt =
          "Something happened in setting up the request that triggered an Error";
        console.log(errorAlt, error.message);
      }
      console.log(error.config);
    });
  }
  if (item === "user") {
    Axios.delete(`http://localhost:3001/api/auth/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (error) {
      if (error.response) {
        const errorRes =
          "The request was made and the server responded with a status code that falls out of the range of 2xx";
        console.log(errorRes);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        const errorReq = "The request was made but no response was received.";
        console.log(errorReq);
        console.log(error.request);
      } else {
        const errorAlt =
          "Something happened in setting up the request that triggered an Error";
        console.log(errorAlt, error.message);
      }
      console.log(error.config);
    });
  } else {
    Axios.delete(`http://localhost:3001/api/delete/article/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (error) {
      if (error.response) {
        const errorRes =
          "The request was made and the server responded with a status code that falls out of the range of 2xx";
        console.log(errorRes);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        const errorReq = "The request was made but no response was received.";
        console.log(errorReq);
        console.log(error.request);
      } else {
        const errorAlt =
          "Something happened in setting up the request that triggered an Error";
        console.log(errorAlt, error.message);
      }
      console.log(error.config);
    });
  }
};

export default deleteRequest;
