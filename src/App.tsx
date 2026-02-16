import React, { useEffect, useState } from 'react';
import { usePeople } from './hooks/usePeople';
import { CharacterCard } from './components/CharacterCard';
import { Pagination } from './components/Pagination';
import {
  Search,
  Loader2,
  Star,
  TriangleAlert,
  Rocket,
  Github,
  Inbox,
  Grid3x3,
  SearchIcon,
  X
} from 'lucide-react';
import './App.css';

/**
 * Dashboard principal que implementa la arquitectura de Panel Dual.
 * Diseñado para ser responsivo, intuitivo y estético.
 */
function App() {
  const [query, setQuery] = useState('');

  // Consumimos el hook personalizado con manejo de estados y paginación
  const {
    searchResults,
    allPeople,
    favorites,
    peoplePage,
    peopleTotalPages,
    favoritesPage,
    favoritesTotalPages,
    loading,
    error,
    viewMode,
    searchPeople,
    fetchAllPeople,
    addFavorite,
    removeFavorite,
    loadFavorites,
    handlePeoplePageChange,
    handleFavoritesPageChange,
    setViewMode,
    clearError,
  } = usePeople();

  // Carga inicial de datos
  useEffect(() => {
    loadFavorites(1);
    fetchAllPeople(1); // Load first page of all characters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchPeople(query);
    }
  };

  const handleBrowseAll = () => {
    setQuery('');
    fetchAllPeople(1);
  };

  const currentResults = viewMode === 'search' ? searchResults : allPeople;

  return (
    <div className="app-shell">
      {/* --- PANEL IZQUIERDO: EXPLORADOR PRINCIPAL --- */}
      <main className="main-scroll">
        <header className="explorer-header">
          <div className="brand-group">
            <h1 className="brand-logo">
              FORCE<span className="accent-text">SEARCH</span>
            </h1>
            <span className="version-tag">v2.0 Beta</span>
          </div>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button
              className={`mode-btn ${viewMode === 'browse' ? 'active' : ''}`}
              onClick={handleBrowseAll}
              disabled={loading}
            >
              <Grid3x3 size={18} />
              <span>Explorar Todos</span>
            </button>
            <button
              className={`mode-btn ${viewMode === 'search' ? 'active' : ''}`}
              onClick={() => setViewMode('search')}
              disabled={loading}
            >
              <SearchIcon size={18} />
              <span>Buscar</span>
            </button>
          </div>

          {/* Search Interface - Only visible in search mode */}
          {viewMode === 'search' && (
            <form onSubmit={handleSearch} className="search-interface">
              <div className="input-group">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Busca un personaje (ej. Darth Vader)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? <Loader2 className="spin" size={20} /> : 'Buscar'}
              </button>
            </form>
          )}
        </header>

        <section className="content-viewport">
          {/* MANEJO DE ESTADO: ERROR */}
          {error && (
            <div className="error-card animate-fade-in">
              <TriangleAlert size={24} />
              <div className="error-text">
                <strong>Error de Conexión</strong>
                <p>{error}</p>
              </div>
              <button className="error-close-btn" onClick={clearError} aria-label="Cerrar error">
                <X size={20} />
              </button>
            </div>
          )}

          {/* MANEJO DE ESTADO: LOADING (Skeletons) */}
          {loading ? (
            <div className="results-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="skeleton-item loading-pulse" />
              ))}
            </div>
          ) : currentResults.length > 0 ? (
            <>
              {/* RESULTADOS: Renderizado con animación de cascada */}
              <div className="results-grid">
                {currentResults.map((character, index) => (
                  <div
                    key={character.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CharacterCard
                      character={character}
                      onAction={addFavorite}
                    />
                  </div>
                ))}
              </div>

              {/* PAGINACIÓN - Solo en modo browse */}
              {viewMode === 'browse' && (
                <Pagination
                  currentPage={peoplePage}
                  totalPages={peopleTotalPages}
                  onPageChange={handlePeoplePageChange}
                  loading={loading}
                />
              )}
            </>
          ) : (
            /* MANEJO DE ESTADO: VACÍO */
            <div className="empty-state-visual">
              <div className="icon-circle">
                <Rocket size={48} strokeWidth={1.5} />
              </div>
              <h2>
                {viewMode === 'search'
                  ? 'No se encontraron resultados'
                  : 'Que la búsqueda te acompañe'}
              </h2>
              <p>
                {viewMode === 'search'
                  ? 'Intenta con otro nombre de personaje.'
                  : 'Explora todos los personajes de Star Wars o busca uno específico.'}
              </p>
            </div>
          )}
        </section>
      </main>

      {/* --- PANEL DERECHO: BARRA LATERAL DE FAVORITOS --- */}
      <aside className="favorites-aside">
        <div className="aside-header">
          <div className="title-area">
            <Star size={20} fill="var(--star-color)" color="var(--star-color)" />
            <h2>Favoritos</h2>
            <span className="pill-count">{favorites?.length || 0}</span>
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link">
            <Github size={20} />
          </a>
        </div>

        <div className="favorites-scroll-area">
          {favorites && favorites.length > 0 ? (
            <>
              {favorites?.map((fav) => (
                <div key={fav.id} className="animate-fade-in">
                  <CharacterCard
                    character={fav}
                    onAction={removeFavorite}
                    isFavorite={true}
                  />
                </div>
              ))}

              {/* Paginación de favoritos */}
              {favoritesTotalPages > 1 && (
                <div className="favorites-pagination">
                  <Pagination
                    currentPage={favoritesPage}
                    totalPages={favoritesTotalPages}
                    onPageChange={handleFavoritesPageChange}
                    loading={false}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="empty-favorites-hint">
              <Inbox size={32} />
              <p>No has guardado personajes aún.</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default App;