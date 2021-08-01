//Import getOne-user --> username, mail
//Import PUT req, User
//Import DELETE req User

import { useState } from "react";

function MonCompte() {
    const username = 'Francis Kuck'
    const email = "kuck.francis@gmail.com"
    const [isOpen, setIsOpen]= useState(false)

    const modify= () => {
        setIsOpen(true)
    }

    const submit = () => {
        setIsOpen(false)
    }


    return isOpen ? (
        <form className='monCompte'>
            <label> Nouveau Username : </label>
            <input type='text' placeholder="username" required /> 
            <label> Nouvelle adresse mail : </label>
            <input type='email' placeholder="@mail" required /> 
            <label> Nouveau mot de passe : </label>
            <input type='password' placeholder="********" required /> 
            <button onClick={submit}> Enregistrer les modifications </button>
        </form>
    ) : (
        <div className='monCompte'>
            <p> Username : {username} </p>
            <p> Adresse mail : {email} </p>
            <p> Mot de passe : ******** </p>
            <button onClick={modify}> 🖊️ Modifier  </button>
        </div>
    )
}

export default MonCompte;
