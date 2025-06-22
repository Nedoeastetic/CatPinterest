import { useEffect, useState, useCallback } from 'react';
import './CatsGrid.css';

interface CatImage {
  id: string;
  url: string;
  width?: number;
  height?: number;
}

const CatsGrid = () => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCats = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const url = `https://api.thecatapi.com/v1/images/search?limit=20&page=${page}`;
      const api_key = import.meta.env.VITE_CAT_API_KEY || 'DEMO_API_KEY';

      const response = await fetch(url, {
        headers: {
          'x-api-key': api_key
        }
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setCats(prev => [...prev, ...data]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (showFavorites) return;

      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollHeight - (scrollTop + clientHeight) < 100 && !loading) {
        fetchCats();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchCats, loading, showFavorites]);

  useEffect(() => {
    fetchCats();
  }, []);

  const handleLike = (catId: string) => {
    setFavorites(prev => 
      prev.includes(catId) 
        ? prev.filter(id => id !== catId) 
        : [...prev, catId]
    );
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const displayedCats = showFavorites 
    ? cats.filter(cat => favorites.includes(cat.id))
    : cats;

  if (error) {
    return (
      <div className="error-message">
        <p>Произошла ошибка: {error}</p>
        <button onClick={() => window.location.reload()}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="header-title">
          Котики
        </h1>
        <button 
          onClick={toggleFavorites}
          className={`favorites-button ${showFavorites ? 'active' : ''}`}
        >
          {showFavorites ? 'Все котики' : 'Любимые котики'}
        </button>
      </header>
      
      <main className="main-content">
        <div className="cats-grid">
          {displayedCats.length > 0 ? (
            displayedCats.map((cat) => (
              <div key={`${cat.id}-${cat.url}`} className="grid-cell">
                <img 
                  src={cat.url} 
                  alt={`Cat ${cat.id}`} 
                  className="cat-image"
                  loading="lazy"
                />
                <button
                  onClick={() => handleLike(cat.id)}
                  className={`like-button ${favorites.includes(cat.id) ? 'liked' : ''}`}
                >
                  {favorites.includes(cat.id) ? '❤️' : '♡'}
                </button>
              </div>
            ))
          ) : (
            <div className="no-cats-message">
              {showFavorites ? 'У вас пока нет любимых котиков' : 'Не удалось загрузить котиков'}
            </div>
          )}
        </div>

        {loading && !showFavorites && (
          <div className="loading-indicator">
            Загружаем больше котиков...
          </div>
        )}

        {!hasMore && !showFavorites && (
          <div className="end-message">
            Вы увидели всех котиков!
          </div>
        )}
      </main>
    </div>
  );
};

export default CatsGrid;