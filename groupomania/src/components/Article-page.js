import {useHistory, useParams} from 'react-router-dom'
import { useState, useEffect } from "react";
import getOne from '../services/getOne-request';


function Article() {
  const {id} = useParams()
  let articleId = id.replace(':', '');
  console.log("articleID =", articleId)
  let history = useHistory()

  const [article, setArticle] = useState({id:'', title:'', content: '', author:''})
  
  getOne(articleId);
  /*useEffect(() => {
    getOne();
  }, [articleId]);*/

  console.log(article)
  
  return (
       <>
          <button onClick={() => {history.push('/')}}> Go to the Home page</button>
       </>
  );
}

export default Article;