import Axios from "axios";

const loginRequest = async (user, {setToken, setUserId} ) => {
    return await Axios.post("http://localhost:3001/api/auth/post/login", user)
}

export default loginRequest