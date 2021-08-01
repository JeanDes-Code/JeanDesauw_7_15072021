import { useState, useEffect } from "react"
import loginRequest from "../services/login-request"
import signupRequest from "../services/signup-request"

function Login (props) {

    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [isOpen, setIsOpen] = useState(true)
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [newUser, setNewUser] = useState({
        email: "",
        username: "",
        password: ""
    })

    useEffect(()=> {
        if (token !== "" && token !== undefined) {
            console.log("Votre token authentification est le suivant : ", token, " et votre userId = ", userId);
            setWithExpiry("token", token, 28800000); //8h = 28800000ms
            setWithExpiry("userId", userId, 28800000);
            props.history.push('/')
        } else {
            console.log( "Il y a eu une erreur lors de la connection, veuillez réessayez ")
        }
    }, [token])

    const setWithExpiry = (key, value, ttl) => {
        const now = new Date();
        const item = {
          value: value,
          expiry: now.getTime() + ttl,
        };
        localStorage.setItem(key, JSON.stringify(item));
      };

    const connectUser = async (e) => {
        e.preventDefault();
        const response = await loginRequest(user);
        setToken(response.data.token)
        setUserId(response.data.id)

    }

    const createUser = async () => {
        await signupRequest(newUser)
        alert('Votre compte a bien été créé. Vous pouvez vous connecter dès à présent.')
        setIsOpen(true);
    }

    return isOpen ? (
        <div className="login-component">

            <form className="login-card">
                <input type="text" placeholder="Username" required onChange={(e) => {setUser({ ...user, username : e.target.value })}} /> 
                <input type="password" placeholder="Mot de passe" required onChange={(e) => {setUser({ ...user, password : e.target.value })}} /> 
                <button className='btn' onClick={connectUser}> Se connecter </button>
            </form>
            <div className="changeToSignup">
                <h2> Vous n'avez pas de compte ?  </h2>
                <button className='btn' onClick={ () => {setIsOpen(false)} }> Créez un compte ! </button>
            </div>

        </div>
    ) : (
        <div className="login-component">

            <form className="login-card">
                <input type="email" placeholder="Adresse e-mail" required onChange={(e) => {setNewUser({ ...newUser, email : e.target.value })}} /> 
                <input type="text" placeholder="Username" required onChange={(e) => {setNewUser({ ...newUser, username : e.target.value })}} /> 
                <input type="password" placeholder="Mot de passe" required onChange={(e) => {setNewUser({ ...newUser, password : e.target.value })}} />
                <button className='btn' onClick={createUser}> Créer un compte </button>
            </form>
            <div className="changeToSignup">
                <h2> Vous avez déjà un compte ? </h2>
                <button className='btn' onClick={ () => {setIsOpen(true)} }> Connectez-vous ! </button>
            </div>

        </div>
    )
}

export default Login
