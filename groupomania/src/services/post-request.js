import Axios from "axios";

const postRequest = async (data, id, item) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  if (item === "comment") {
    return await Axios.post(`http://localhost:3001/api/commentaires/post/${id}`, data, {
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

  if (item === "like") {
    return await Axios.post("http://localhost:3001/api/like/", data, {
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

  if (item === "like-comment") {
    Axios.post("http://localhost:3001/api/like/comment/", data, {
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

  if (item === "article") {
    return await Axios.post("http://localhost:3001/api/post/article", data, {
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
    console.log(
      "Une erreur s'est produite, veuillez réessayez ultérieurement."
    );
  }
};

export default postRequest;
