import Axios from "axios"

const postRequest = (newArticle) => {
    Axios.post("http://localhost:3001/api/post/article", newArticle);
};

export default postRequest