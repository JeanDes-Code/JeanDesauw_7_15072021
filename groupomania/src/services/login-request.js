import Axios from "axios";

const loginRequest = async (user) => {
    return await Axios.post("http://localhost:3001/api/auth/post/login", user)
}

export default loginRequest