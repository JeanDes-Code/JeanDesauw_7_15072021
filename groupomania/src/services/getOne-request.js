import Axios from "axios";


const getOne = (id) => {
  console.log("id dans la requete :", id)
  Axios.get(`http://localhost:3001/api/get/article/${id}`).then((response) => {
    console.log(response)
  })
};

export default getOne;
