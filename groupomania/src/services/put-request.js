import Axios from "axios";

const putRequest = (id, data, articleId, item) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (articleId === "article") {
    return (Axios.put(`http://localhost:3001/api/update/article/${id}`, data , 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (error) {
      if (error.response) {
        const errorRes = "The request was made and the server responded with a status code that falls out of the range of 2xx"
        console.log(errorRes);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        const errorReq = "The request was made but no response was received."
        console.log(errorReq);
        console.log(error.request);
      } else {
        const errorAlt = "Something happened in setting up the request that triggered an Error"
        console.log(errorAlt, error.message);
      }
      console.log(error.config);
      }));
  } if (articleId === "user") {
    return (Axios.put(`http://localhost:3001/api/auth/put`, data , 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (error) {
      if (error.response) {
        const errorRes = "The request was made and the server responded with a status code that falls out of the range of 2xx"
        console.log(errorRes);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        const errorReq = "The request was made but no response was received."
        console.log(errorReq);
        console.log(error.request);
      } else {
        const errorAlt = "Something happened in setting up the request that triggered an Error"
        console.log(errorAlt, error.message);
      }
      console.log(error.config);
      return Promise.reject(error);
      }));
  }if (item === 'commentaire') {
    return (Axios.put(`http://localhost:3001/api/commentaires/put/${articleId}/${id}`, data , 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (error) {
      if (error.response) {
        const errorRes = "The request was made and the server responded with a status code that falls out of the range of 2xx"
        console.log(errorRes);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        const errorReq = "The request was made but no response was received."
        console.log(errorReq);
        console.log(error.request);
      } else {
        const errorAlt = "Something happened in setting up the request that triggered an Error"
        console.log(errorAlt, error.message);
      }
      console.log(error.config);
      }));
  }else {
    console.log("Une erreur est survenue lors de la requête.")
    return
  }
};

export default putRequest;
