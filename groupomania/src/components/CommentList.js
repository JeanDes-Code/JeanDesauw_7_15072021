///Affiche la liste des commentaires associée à un article. En affichant plusieurs <CommentItem />
import { useState, useEffect } from "react";
//Services
//import getComs from "../services/getComs-request"



const CommentList= ({commentList}) => {

    
    
    return (
        <div className="comment-list">
          {commentList.map(({ id, content, author }) => (
              <div key={id} className="comment" >
                <p> {content} </p>
                <h3 className="article-display-author">
                    Publié par {author}{" "}
                </h3>
              </div>
            
          ))}
        </div>
    );
}

export default CommentList