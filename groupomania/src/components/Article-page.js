import { useParams} from 'react-router-dom'
import { useState, useEffect } from "react";

//Service
import getOne from '../services/getOne-request';

//Composant
import ArticleItem from './ArticleItem';
import CommentList from './CommentList';

function Article() {
  const {id} = useParams()

  const [article, setArticle] = useState([{id:'', title:'', content: '', author:''}])
  const [commentList, setCommentList] = useState([])
  
  //route introuvable pour la requête ..
  useEffect(() => {
    getOne(id, {setArticle});
  }, [id]);

  return (
       <> 
          <button onClick={() => {console.log(article)}} > test </button>
          <ArticleItem  id={article[0].id} title={article[0].title} content={article[0].content} author={article[0].author} />
          <CommentList commentList={commentList} />
       </>
  );
}

export default Article;