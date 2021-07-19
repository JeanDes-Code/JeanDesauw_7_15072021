import Axios from 'axios'

const getArticle = ({setArticleList}) => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setArticleList(response.data) ;
    });
}

export default getArticle
