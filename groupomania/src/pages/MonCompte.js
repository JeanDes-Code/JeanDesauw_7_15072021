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
    const [errorMessage, setErrorMessage] = useState("");

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
    }, [])

    
    const modify= () => {
        setIsOpen(true)
    }


    const submit = async (e) => {
        e.preventDefault()
        try {
            const response = await putRequest(id, data, item)
            if(response) {
                alert("Modifications enregistrées, merci de vous reconnectez. ")
                localStorage.clear()
                history.push('/')
            }
        } catch (error) {
            const {response} = error
            setErrorMessage(response.data)
        }
    }

    const deleteUser = () => {
        const resultat = window.confirm("Cette action supprimera votre compte ainsi que toutes vos pubilications, commentaires et likes. Êtes-vous sur de vouloir continuer ?")
        if (resultat) {
            deleteRequest(id, articleId, item)
            localStorage.clear()
            history.push('/')
        } else {
            return
        }
    }

    return isOpen ? (
        <div className="monCompte">
            <h1> Modifier mon compte : </h1> 
            <form className='monCompte-form' autoComplete="on" onSubmit={submit}>
                <div className="monCompte-input">
                    <label className='monCompte-label'> Nouveau Username : </label>
                    <input type='text' placeholder="username" required onChange={(e) => {setData({ ...data, username: e.target.value })}}/>
                </div>
                <div className="monCompte-input">
                    <label className='monCompte-label'> Nouvelle adresse mail : </label>
                    <input type='email' placeholder="Adresse-mail" required onChange={(e) => {setData({ ...data, email: e.target.value })}}/> 
                </div> 
                <div className="monCompte-input">
                    <label className='monCompte-label'> Nouveau mot de passe : </label>
                    <input type='password' pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,120})$" placeholder="********" required onChange={(e) => {setData({ ...data, password: e.target.value })}}/>
                </div>
                {errorMessage ? (
                <p className="errorMessage">{errorMessage}</p>
                ) : null}  
                <input type="submit" className='monCompte-form-btn' value="Enregistrer" /> 
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
