import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddButton from '../components/AddButton';

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const response = await fetch('http://170.187.229.248:8000/articles/api');
      const data = await response.json();
      setArticles(data);
      console.log('hi')
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const navigate = useNavigate();



  return (
    <div className="Articles">
      <div className="Articles-header">
        <p className="Articles-count"> Total is {articles.length} Articles</p>
      </div>
      <div className="Articles-list">
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <>    
          <button key={article.pk} onClick={() => navigate(`/Article/${article.pk}`)}>{article.pk} {article.title}</button>       
          <li key={article.pk}>{article.body}</li>
          {/*<li key={article.pk}>{article.author}</li>*/}
          <li key={article.pk}>{new Date(article.date).toLocaleString()}</li>
          <hr/>
          <br/>
          </>
        ))}
      </ul>
      <AddButton/>
    </div>
    </div>
  )
}

export default App;
