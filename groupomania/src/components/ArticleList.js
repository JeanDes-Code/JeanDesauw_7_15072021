import {useState} from "react"

import getArticle from "../services/get-request"
import deleteRequest from "../services/delete-request";

function ArticleList ( {articleList, setArticleList} ) {
    const [modifiedArticle, setModifiedArticle] = useState({title: '', content: ''});
    
    const deleteArticle = (id) => {
      deleteRequest(id);
      getArticle({setArticleList});
    }

    const updateArticle = (id) => {
        console.log(id, modifiedArticle)
        Axios.put(`http://localhost:3001/api/update/${id}`, { modifiedArticle });
    
        getArticle({setArticleList})
        setModifiedArticle({title: '', content: ''})
    };

    return (
    <div className="article-list">
        {articleList.map((article, index) => {
          return (
            <div key={`${article}-${index}`} className="card">
              
              <div className="article-display">
                <h2 className="article-display-title"> {article.title} </h2>
                <p> {article.content} </p>
                <h3 className="article-display-author">Publié par {article.author} </h3>
              </div>
              
              <div className="article-modification">
                <span className='border'></span>
                <h3> Modifier l'article : </h3>

                <div className='article-modification-title'>
                  <label> Nouveau titre :</label>
                  <input className="newTitle updateInput" type="text" placeholder="Nouveau titre" onChange={(e) => {setModifiedArticle({...modifiedArticle, title: e.target.value});}}/>
                </div>

                <label> Nouveau corps de l'article </label>
                <textarea className="newContent updateInput" type="text" placeholder="Nouveau contenu" onChange={(e) => {setModifiedArticle({...modifiedArticle, content: e.target.value});}}/>
                <button className="btn" onClick={() => {updateArticle(article.id);}}>Modifier l'article</button>
                <span className='border'></span>
                <button className="btn" onClick={() => {deleteArticle(article.id);}}>Supprimer l'article</button>
              </div>
                
            </div>
          );
        })}
    </div>
    )
}

export default ArticleList