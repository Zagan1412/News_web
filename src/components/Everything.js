import React, { useState, useEffect } from 'react';
import './Style.css';

const Everything = ({ searchTerm, onSearch, onBack }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchTerm) {
      fetch(
        `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=a12931fe22c5486c926e123b25c05486`
      )
        .then((response) => response.json())
        .then((data) => {
          setArticles(data.articles.slice(0, 15));
          setLoading(false);
        });
    }
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newSearchTerm = e.target.elements.search.value;
    onSearch(newSearchTerm);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="everything">
      <div className="topbar">
        <h2>Search Results</h2>
        <form onSubmit={handleSearchSubmit}>
          <input type="text" name="search" placeholder="Search for news..." />
          <button type="submit">Search</button>
          <button type="button" onClick={onBack}>Back</button>
        </form>
      </div>
      <div className="articles">
        {articles.map((article) => (
          <article className="article" key={article.url}>
            <section>
              <img src={article.urlToImage} alt={article.title} />
              <h3>{article.title}</h3>
              <p className="article-description">{article.description}</p>
                <p className="article-time">Published at: {new Date(article.publishedAt).toLocaleString()}</p>
            </section>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Everything;
