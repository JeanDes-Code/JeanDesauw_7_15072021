import Axios from "axios";


const getOne = (id, {setArticle}) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  console.log("id dans la requete :", id)
  Axios.get(`http://localhost:3001/api/get/article/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    setArticle(response.data);
    console.log(response.data)
  });
};

export default getOne;
