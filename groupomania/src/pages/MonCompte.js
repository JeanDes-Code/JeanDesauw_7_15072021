import { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'
//services
import getOne from "../services/getOne-request";
import putRequest from "../services/put-request";
import deleteRequest from "../services/delete-request";


function MonCompte() {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [isOpen, setIsOpen]= useState(false)
    const [data, setData] = useState({
        username : "",
        email : "",
        password : "" 
    })


    const item = 'user'
    const id = null;
    const articleId = null;
    const getUser = async () => {
        const response = await getOne(id, item)
        setUsername(response.data[0].username)
        setEmail(response.data[0].email)
    }

    useEffect(() => {
        getUser()
    })

    
    const modify= () => {
        setIsOpen(true)
    }

    const submit = () => {
        putRequest(id, data, item)
        alert("Modifications enregistrées, merci de vous reconnectez. ")
        history.push('/')
        localStorage.clear()
    }

    const deleteUser = () => {
        deleteRequest(id, articleId, item)
        history.push('/')
        localStorage.clear()
    }

    return isOpen ? (
        <form className='monCompte'>
            <label> Nouveau Username : </label>
            <input type='text' placeholder="username" required onChange={(e) => {setData({ ...data, username: e.target.value })}}/> 
            <label> Nouvelle adresse mail : </label>
            <input type='email' placeholder="@mail" required onChange={(e) => {setData({ ...data, email: e.target.value })}}/> 
            <label> Nouveau mot de passe : </label>
            <input type='password' placeholder="********" required onChange={(e) => {setData({ ...data, password: e.target.value })}}/> 
            <button onClick={submit}> Enregistrer les modifications </button>
        </form>
    ) : (
        <div className='monCompte'>
            <p> Username : {username} </p>
            <p> Adresse mail : {email} </p>
            <p> Mot de passe : ******** </p>
            <button className="btn" onClick={modify}> 🖊️ Modifier  </button>
            <button className="btn btn-alert" onClick={deleteUser}> 🗑️ Supprimer le compte </button>
        </div>
    )
}

export default MonCompte;
