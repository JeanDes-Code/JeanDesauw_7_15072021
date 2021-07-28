import Axios from "axios";


const getOne = (id, {setArticle, setUsername, setRole}) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  console.log("id dans la requete :", id)
  Axios.get(`http://localhost:3001/api/get/article/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    setArticle(response.data.result);
    setUsername(response.data.username);
    setRole(response.data.role);
  });
};

export default getOne;
