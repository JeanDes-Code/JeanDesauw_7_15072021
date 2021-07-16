import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios"

function App() {

  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const [articleAuthor, setArticleAuthor] = useState('')

  const [articleList, setArticleList] = useState([])

  const [newContent, setNewContent] = useState('')
  const [newTitle, setNewTitle] = useState('')

  useEffect( () => {
    Axios.get('http://localhost:3001/api/get').then((response) =>{
      setArticleList([response.data])
    })
  }, [])

  const submitArticle = () => {

    Axios.post('http://localhost:3001/api/insert',{ 
      articleTitle: articleTitle, 
      articleContent: articleContent,
      articleAuthor: articleAuthor,
    });

    setArticleList([
      ...articleList, 
      {articleTitle: articleTitle, articleContent: articleContent, articleAuthor: articleAuthor}
    ]);
  };

  const deleteArticle = (id) => {

    Axios.delete(`http://localhost:3001/api/delete/${id}`);
    //ajouter la mise à jour de la liste d'article
  };

  const updateArticle = (id) => {
    Axios.put('http://localhost:3001/api/update', {
      articleId: id,
      articleTitle: newTitle,
      articleContent: newContent,
    });

    //ajouter la mise à jour de l'article automatique
    setArticleContent('')
  }

  return (
    <div className="App">
      <h1>Réseau social d'entreprise - Groupomania </h1>
      
      <div className='form'>
        <label> Titre de l'article</label>
        <input type="text" name='articleTitle' onChange={(e) => {
          setArticleTitle(e.target.value)
        }}
        />
        <label> Contenu de l'article </label>
        <input type="text" name='content' onChange={(e) => {
          setArticleContent(e.target.value)
        }}
        />
        <label> Auteur de l'article </label>
        <input type="text" name='author' onChange={(e) => {
          setArticleAuthor(e.target.value)
        }}
        />

        <button onClick={submitArticle}>Submit</button>

        {articleList.map((val) => {
          if (val.articleTitle)
            return (
            <div className='card'>
              <h2>{val.articleTitle} </h2> 
              <p>{val.articleContent}</p>
              <h3>{val.articleAuthor}</h3>
              <p>Article publié le {val.date_publication}</p>

              <button onClick={ () => {deleteArticle (val.id)}}> Delete </button>
              <label> Modifier le titre de l'article : </label>
              <input type="text" id='updateInput' onChange={ (e) => {
                setNewTitle(e.target.value)
              }}
              />
              <label> Modifier le contenu de l'article : </label>
              <input type="text" id='updateInput' onChange={ (e) => {
                setNewContent(e.target.value)
              }}
              />
              <button onClick={() => {updateArticle(val.id)}}> Update </button>
            </div>
            )
        })}
      </div>
    </div>
  );
}

export default App;
