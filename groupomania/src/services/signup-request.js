import Axios from "axios";

const signupRequest = (newUser) => {
    Axios.post("http://localhost:3001/api/auth/post/signup", newUser).then((response) => {
      console.log(response)
    });
}

export default signupRequest