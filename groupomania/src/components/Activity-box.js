import {useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'

//service 
import getArticle from "../services/get-request";


function ActivityBox(props) {
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false)
    const [articleList, setArticleList] = useState([]);
    const [comments, setComments] = useState([]);
  
    const getElements = async() => {
        const item='getComments';
        const response = await getArticle()
        setArticleList(response.data)
        const commentsList = await getArticle(item)
        setComments(commentsList.data)
    }

    useEffect(() => {
        getElements();
    }, []);

    const lastArticles = articleList.slice(-3)
    lastArticles.sort((a,b) => b.id -a.id)
    const lastComments = comments.slice(-3)
    lastComments.sort((a,b) => b.id -a.id)

    return isOpen ? (
        <div className='activityBox'>
            <div className="activityBox-header">
                <h1> Dernières publications </h1>
                <button className="activityBox-btn-close" onClick={(e)=>{setIsOpen(false)}}>❌ Close</button>
            </div>
            <div className='activityArticle'>
                <h2> Derniers articles </h2>
                <div className='activityBox-list'>
                    <div className="empty"></div>
                    <ul>
                    {lastArticles.map(({ id, title }) => (
                            <li key={id} className="lastArticle activityBox-listItem" onClick={() => {history.push(`/${id}`)}}> {title} </li>

                    ))}
                    </ul>
                </div>
            </div>
            <div className='activityComments'>
                <h2> Derniers commentaires </h2>
                <div className='activityBox-list'>
                    <div className="empty"></div>
                    <ul>
                    {lastComments.map(({ id, commentaire, articleId }) => (
                        <li key={id} className="lastComment activityBox-listItem" onClick={() => {history.push(`/${articleId}`)}}> {commentaire} </li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    ) : (
        <button className="btn activityBox-btn" onClick={(e)=>{setIsOpen(true)}}> Dernières publications </button>
    );
}

export default ActivityBox;
