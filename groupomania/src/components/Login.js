import { useState } from "react"
import loginRequest from "../services/login-request"
import signupRequest from "../services/signup-request"

function Login () {
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

    const connectUser = () => {
        console.log(user)
        loginRequest(user)
    }

    const createUser = () => {
        console.log(newUser)
        signupRequest(newUser)
    }


    return isOpen ? (
        <div className="login-component">

            <div className="login-card">
                <input type="text" placeholder="Username" onChange={(e) => {setUser({ ...user, username : e.target.value })}} /> 
                <input type="password" placeholder="Mot de passe" onChange={(e) => {setUser({ ...user, password : e.target.value })}} /> 
                <button className='btn' onClick={connectUser}> Se connecter </button>
            </div>
            <div className="changeToSignup">
                <h2> Vous n'avez pas de compte ?  </h2>
                <button className='btn' onClick={ () => {setIsOpen(false)} }> Créez un compte ! </button>
            </div>

        </div>
    ) : (
        <div className="login-component">

            <div className="login-card">
                <input type="email" placeholder="Adresse e-mail" onChange={(e) => {setNewUser({ ...newUser, email : e.target.value })}} /> 
                <input type="text" placeholder="Username" onChange={(e) => {setNewUser({ ...newUser, username : e.target.value })}} /> 
                <input type="password" placeholder="Mot de passe" onChange={(e) => {setNewUser({ ...newUser, password : e.target.value })}} />
                <button className='btn' onClick={createUser}> Créer un compte </button>
            </div>
            <div className="changeToSignup">
                <h2> Vous avez déjà un compte ? </h2>
                <button className='btn' onClick={ () => {setIsOpen(true)} }> Connectez-vous ! </button>
            </div>

        </div>
    )
}

export default Login
