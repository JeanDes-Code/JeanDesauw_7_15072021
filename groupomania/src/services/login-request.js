import Axios from "axios";

const loginRequest = (user, {setToken, setUserId} ) => {
    Axios.post("http://localhost:3001/api/auth/post/login", user).then((response) => {
        setToken(response.data.token)
        setUserId(response.data.id)
    }); 
}

export default loginRequest