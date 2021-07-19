import {useState} from "react"
import Axios from "axios";

function ArticleList ( {articleList, setArticleList} ) {
    const [modifiedArticle, setModifiedArticle] = useState({title: '', content: ''})

    const getArticle = () => {
        Axios.get("http://localhost:3001/api/get").then((response) => {
          setArticleList(response.data);
        });
      }

    const deleteArticle = (id) => {
        Axios.delete(`http://localhost:3001/api/delete/${id}`).then((res) => {
          if (res.status === '204') {
            getArticle()
          }
        });
    };
    
    const updateArticle = (id) => {
        console.log(id, modifiedArticle)
        Axios.put(`http://localhost:3001/api/update/${id}`, { modifiedArticle });
    
        //ajouter la mise à jour de l'article automatique
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