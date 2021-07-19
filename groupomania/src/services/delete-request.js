import Axios from 'axios'
import getArticle from "./get-request"

const deleteRequest = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`)
}

export default deleteRequest
