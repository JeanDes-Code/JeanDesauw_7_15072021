import Axios from "axios";


const getOne = (id, {setArticle}) => {
  console.log("id dans la requete :", id)
  Axios.get(`http://localhost:3001/api/get/article/${id}`).then((response) => {
    setArticle(response.data);
    console.log(response.data)
  });
};

export default getOne;
