import Axios from "axios"

const postRequest = (newArticle) => {
    Axios.post("http://localhost:3001/api/insert", newArticle);
};

export default postRequest