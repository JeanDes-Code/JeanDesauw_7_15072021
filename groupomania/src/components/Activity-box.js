import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

//service
import getArticle from "../services/get-request";

function ActivityBox() {
  const hot = <FontAwesomeIcon icon={faFire} alt="Publications récentes" />;
  const close = <FontAwesomeIcon icon={faTimes} alt="Fermer" />;
  const [isOpen, setIsOpen] = useState(false);
  const [articleList, setArticleList] = useState([]);
  const [comments, setComments] = useState([]);

  const getElements = async () => {
    const item = "getComments";
    const response = await getArticle();
    if (response) {
      setArticleList(response.data);
      const commentsList = await getArticle(item);
      if (commentsList) {
        setComments(commentsList.data);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getElements();
  }, [isOpen]);

  const lastArticles = articleList.slice(-3);
  lastArticles.sort((a, b) => b.id - a.id);
  const lastComments = comments.slice(-3);
  lastComments.sort((a, b) => b.id - a.id);

  return isOpen ? (
    <div className="activityBox">
      <div className="activityBox-header">
        <h1>
          {" "}
          Publications récentes <span className="alert">{hot}</span>{" "}
        </h1>
        <button
          className="activityBox-btn-close btn-alert"
          onClick={(e) => {
            setIsOpen(false);
          }}
        >
          {close} <span className="item-hide">Close</span>
        </button>
      </div>
      <div className="activityArticle">
        <h2> . Articles récents </h2>
        <div className="activityBox-list">
          <div className="empty"></div>
          <ul>
            {lastArticles.map(({ id, title }) => (
              <li
                key={id}
                className="lastArticle activityBox-listItem"
                onClick={() => {
                  document.location.href = `/${id}`;
                }}
              >
                {" "}
                -&gt;{title}{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="activityComments">
        <h2> . Commentaires récents </h2>
        <div className="activityBox-list">
          <div className="empty"></div>
          <ul>
            {lastComments.map(({ id, commentaire, articleId }) => (
              <li
                key={id}
                className="lastComment activityBox-listItem"
                onClick={() => {
                  document.location.href = `/${articleId}`;
                }}
              >
                {" "}
                -&gt;{commentaire}{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <button
      id="hot"
      className="btn activityBox-btn"
      onClick={(e) => {
        setIsOpen(true);
      }}
    >
      {" "}
      Publications récentes <span className="alert">{hot}</span>
    </button>
  );
}

export default ActivityBox;
