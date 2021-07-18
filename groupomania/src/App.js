import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("");

  const [articleList, setArticleList] = useState([]);

  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
   getArticle()
  }, []);

  const getArticle = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setArticleList(response.data);
    });
  }

  const submitArticle = () => {
    Axios.post("http://localhost:3001/api/insert", {
      articleTitle: articleTitle,
      articleContent: articleContent,
      articleAuthor: articleAuthor,
    }).then((res) => {
      console.log(res)
      setArticleList([
        ...articleList,res.data,
      ]);
    })
  };

  const deleteArticle = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`).then((res) => {
      if (res.status = '204') {
        getArticle()
      }
    });
  };

  const updateArticle = (id) => {
    console.log(id, newTitle, newContent)
    Axios.put(`http://localhost:3001/api/update/${id}`, {
      articleId: id,
      newArticleTitle: newTitle,
      newArticleContent: newContent,
    });

    //ajouter la mise à jour de l'article automatique
    setNewContent("");
    setNewTitle("");
  };

  return (
    <div className="App">
      <h1>Réseau social d'entreprise - Groupomania </h1>

      <div className="form">
        <h2>Poster un article : </h2>
        <label> Titre de l'article</label>
        <input type="text" name="articleTitle" onChange={(e) => {setArticleTitle(e.target.value);}}/>
        <label> Contenu de l'article </label>
        <textarea type="text" name="content" onChange={(e) => {setArticleContent(e.target.value);}}/>
        <label> Auteur de l'article </label>
        <input type="text" name="author" onChange={(e) => {setArticleAuthor(e.target.value);}}/>

        <button className="btn" onClick={submitArticle}>
          Submit
        </button>
      </div>
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
                  <input className="newTitle updateInput" type="text" placeholder="Nouveau titre" onChange={(e) => {setNewTitle(e.target.value);}}/>
                </div>
                <label> Nouveau corps de l'article </label>
                <textarea className="newContent updateInput" type="text" placeholder="Nouveau contenu" onChange={(e) => {setNewContent(e.target.value);}}/>
                <button className="btn" onClick={() => {updateArticle(article.id);}}>Modifier l'article</button>
                <span className='border'></span>
                <button className="btn" onClick={() => {deleteArticle(article.id);}}>Supprimer l'article</button>
              </div>
                

            
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
