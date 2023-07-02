import React, { useState, useEffect } from 'react';
import './Style.css';
import Everything from './Everything';



const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('us');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=a12931fe22c5486c926e123b25c05486`
      )
        .then((response) => response.json())
        .then((data) => {
          setArticles(data.articles.slice(0, 15));
          setLoading(false);
        });
    }
  }, [country, searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newSearchTerm = e.target.elements.search.value;
    setSearchTerm(newSearchTerm);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleBack = () => {
    setSearchTerm('');
  };

  return (
    <div className="container">
      {!searchTerm && (
        <>
          <div className="topbar">
            <h1>Per country newsletter</h1>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                name="search"
                placeholder="Search for news..."
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <select className='article-select' value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="us">United States</option>
            <option value="kr">South Korea</option>
            <option value="in">India</option>
            <option value="jp">Japan</option>
            <option value="ua">Ukraine</option>
          </select>
          <p></p>
          <div className="articles">
            {articles.map((article) => (
              <article className="article" key={article.url}>
                <section>
                  <img src={article.urlToImage} alt={article.title} />
                  <h2>{article.title}</h2>
                  <p className="article-description">{article.description}</p>
                  <p className="article-time">Published at: {new Date(article.publishedAt).toLocaleString()}</p>
                </section>
              </article>
            ))}
          </div>
        </>
      )}
      {searchTerm && <Everything searchTerm={searchTerm} onSearch={setSearchTerm} onBack={handleBack} />}
    </div>
  );
};

export default App;
