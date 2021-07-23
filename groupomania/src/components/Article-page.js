import { useParams} from 'react-router-dom'
import { useState, useEffect } from "react";

//Service
import getOne from '../services/getOne-request';
import getComs from '../services/getCom-request';

//Composant
import ArticleItem from './ArticleItem';
import ArticleUpdate from "./ArticleUpdate";
import CommentList from './CommentList';
import CommentPost from './CommentPost';

function Article() {
  const {id} = useParams()

  const [article, setArticle] = useState([{id:'', title:'', content: '', author:''}])
  const [commentList, setCommentList] = useState([])
  
  //route introuvable pour la requête ..
  useEffect(() => {
    getOne(id, {setArticle});
    getComs(id, {setCommentList})
  }, [id]);


  return (
       <div className='article-page'> 
          <div key={id} className="card">
            <ArticleItem  id={id} title={article[0].title} content={article[0].content} author={article[0].author} />
            <div className="article-modification">
            <ArticleUpdate id={id} setArticle={setArticle} />
            </div>
          </div>
          <CommentList commentList={commentList} setCommentList={setCommentList} />
          <CommentPost id={id} setCommentList={setCommentList} />
       </div>
  );
}

export default Article;