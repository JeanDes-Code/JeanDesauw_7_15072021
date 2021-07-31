import { useParams} from 'react-router-dom'
import { useState, useEffect } from "react";

//Service
import getOne from '../services/getOne-request';
import getComs from '../services/getCom-request';

//Composant
import ArticleItem from '../components/ArticleItem';
import ArticleUpdate from "../components/ArticleUpdate";
import CommentList from '../components/CommentList';
import CommentPost from '../components/CommentPost';
import Like from '../components/LikeArticle'

function Article() {
  const {id} = useParams()
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
  const [article, setArticle] = useState([{id:'', title:'', content: '', author:'', file: null}])
  const [commentList, setCommentList] = useState([])
  
  useEffect(() => {
    getOne(id, {setArticle, setUsername, setRole});
    getComs(id, {setCommentList})
  }, [id]);


  console.log(article)
  return username === article[0].author || role === 1 ? (
       <div className='article-page'> 
          <div key={id} className="card">
            <ArticleItem  id={id} title={article[0].title} content={article[0].content} author={article[0].author} file={article[0].file} />
            <Like />
            <div className="article-modification">
            <ArticleUpdate id={id} setArticle={setArticle} setUsername={setUsername} setRole={setRole} />
            </div>
          </div>
          <CommentList commentList={commentList} setCommentList={setCommentList} username={username} role={role} />
          <CommentPost id={id} setCommentList={setCommentList} />
       </div>
  ) : (
    <div className='article-page'> 
          <div key={id} className="card">
            <ArticleItem  id={id} title={article[0].title} content={article[0].content} author={article[0].author} file={article[0].file} />
          </div>
          <CommentList commentList={commentList} setCommentList={setCommentList} username={username} role={role} />
          <CommentPost id={id} setCommentList={setCommentList} />
       </div>
  );
}

export default Article;