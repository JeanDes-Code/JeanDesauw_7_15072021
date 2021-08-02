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
        const resultat = window.confirm("Cette action surpprimera votre compte ainsi que toutes vos pubilications, commentaires et likes. Êtes-vous sur de vouloir continuer ?")
        if (resultat) {
            deleteRequest(id, articleId, item)
            history.push('/')
            localStorage.clear()
        } else {
            return
        }
    }

    return isOpen ? (
        <div className="monCompte">
            <h1> Modifier mon compte : </h1> 
            <form className='monCompte-form'>
                <div className="monCompte-input">
                    <label className='monCompte-label'> Nouveau Username : </label>
                    <input type='text' placeholder="username" required onChange={(e) => {setData({ ...data, username: e.target.value })}}/>
                </div>
                <div className="monCompte-input">
                    <label className='monCompte-label'> Nouvelle adresse mail : </label>
                    <input type='email' placeholder="@mail" required onChange={(e) => {setData({ ...data, email: e.target.value })}}/> 
                </div> 
                <div className="monCompte-input">
                    <label className='monCompte-label'> Nouveau mot de passe : </label>
                    <input type='password' placeholder="********" required onChange={(e) => {setData({ ...data, password: e.target.value })}}/>
                </div> 
                <button className='monCompte-form-btn'  onClick={submit}> Enregistrer </button>
            </form>
        </div>
    ) : (
        <div className='monCompte'>
            <h1> Mon Compte : </h1>
            <div className="monCompte-info">
                <p> Username : {username} </p>
                <p> Adresse mail : {email} </p>
                <p> Mot de passe : ******** </p>
            </div>
            <div className="monCompte-btn">
                <button className="btn" onClick={modify}> 🖊️ Modifier  </button>
                <button className="btn btn-alert" onClick={deleteUser}> 🗑️ Supprimer le compte </button>
            </div>
        </div>
    )
}

export default MonCompte;
