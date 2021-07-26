import Axios from "axios";

const loginRequest = (user) => {
    Axios.post("http://localhost:3001/api/auth/post/login", user).then((response) => {
        console.log(response)
    }); 
}

export default loginRequest