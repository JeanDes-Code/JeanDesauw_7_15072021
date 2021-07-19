import Axios from 'axios'

const deleteRequest = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`)
}

export default deleteRequest
