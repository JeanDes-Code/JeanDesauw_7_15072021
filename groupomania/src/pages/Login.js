import { useState, useEffect } from "react"

//services
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
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=> {
        if (token !== "" && token !== undefined) {
            setWithExpiry("token", token, 28800000); //8h = 28800000ms
            setWithExpiry("userId", userId, 28800000);
            props.history.push('/')
        } else {
            return
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
        e.preventDefault()
        if (user.username === "" || user.password === "") {
            setErrorMessage("Merci de renseigner un username et un mot de passe !")
            return
        } else {
            const response = await loginRequest(user);
            if (response) {
                setToken(response.data.token)
                setUserId(response.data.id)
                setErrorMessage("")
            } else {
                setErrorMessage("Mauvaise combinaison username/ mot de passe !")
            }
        } 
    }

    const createUser = async (e) => {
        e.preventDefault()
        if (newUser.email === "" || newUser.username === "" || newUser.password === "") {
            setErrorMessage("Merci de renseigner toutes les informations demandées !")
        } else {
            const response= await signupRequest(newUser);
            if (response) {
                setErrorMessage("")
                alert('Votre compte a bien été créé. Vous pouvez vous connecter dès à présent.')
                setIsOpen(true);
            } else {
                setErrorMessage(`Il y a un problème. Soit vous avez renseigné un  email invalide. Soit l'email ou le username renseignés sont déjà utilisés. Vérifiez également que votre mot de passe respecte les règles suivantes : 8 charactères minimum dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un charactère spécial.`)
            }
        }
    }

    return isOpen ? (
        <div className="login-component">

            <form className="login-card" method='/post'>
                <input type="text" placeholder="Username" required onChange={(e) => {setUser({ ...user, username : e.target.value })}} /> 
                <input type="password" placeholder="Mot de passe" required onChange={(e) => {setUser({ ...user, password : e.target.value })}} />
                {errorMessage ? (
                <p className="errorMessage">{errorMessage}</p>
                ) : null} 
                <button className='btn' onClick={connectUser}> Se connecter </button>
            </form>
            <div className="changeToSignup">
                <h2> Vous n'avez pas de compte ?  </h2>
                <button className='btn' onClick={ () => {setIsOpen(false)} }> Créez un compte ! </button>
            </div>

        </div>
    ) : (
        <div className="login-component">

            <form className="login-card" method='/post'>
                <input type='email' pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" placeholder="Adresse-mail" required onChange={(e) => {setNewUser({ ...newUser, email : e.target.value })}} /> 
                <input type="text" placeholder="Username" required onChange={(e) => {setNewUser({ ...newUser, username : e.target.value })}} /> 
                <input type="password" pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,120})$' placeholder="Mot de passe" required onChange={(e) => {setNewUser({ ...newUser, password : e.target.value })}} />
                {errorMessage ? (
                <p className="errorMessage">{errorMessage}</p>
                ) : null}
                <input type="submit" className='btn' onClick={createUser} value="Créer un compte" />
            </form>
            <div className="changeToSignup">
                <h2> Vous avez déjà un compte ? </h2>
                <button className='btn' onClick={ () => {setIsOpen(true)} }> Connectez-vous ! </button>
            </div>

        </div>
    )
}

export default Login
