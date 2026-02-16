import { useState } from 'react';
import { apiGet, apiPost } from '../api/axios';
import type { Character } from '../types';

export const usePeople = () => {
  // Search results state
  const [searchResults, setSearchResults] = useState<Character[]>([]);

  // All people state (for browsing with pagination)
  const [allPeople, setAllPeople] = useState<Character[]>([]);
  const [peoplePage, setPeoplePage] = useState(1);
  const [peopleTotalPages, setPeopleTotalPages] = useState(1);

  // Favorites state
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [favoritesTotalPages, setFavoritesTotalPages] = useState(1);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'browse' | 'search'>('browse');

  // Fetch all people with pagination
  const fetchAllPeople = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      console.log('[usePeople] Fetching people from:', `${import.meta.env.VITE_API_GET_URL}/api/people?page=${page}`);
      const { data } = await apiGet.get(`/api/people?page=${page}`);
      console.log('[usePeople] API Response:', data);
      // Backend returns: { total, next, previous, characters }
      const characters = data.characters || [];
      console.log('[usePeople] Characters received:', characters.length);
      console.log('[usePeople] First character:', characters[0]);

      // Filter out characters that are already in favorites
      const favoriteIds = favorites.map(fav => fav.id);
      const filteredCharacters = characters.filter((char: Character) => !favoriteIds.includes(char.id));

      setAllPeople(filteredCharacters);
      setPeoplePage(page);
      setPeopleTotalPages(Math.ceil(data.total / 10)); // SWAPI returns 10 per page
      setViewMode('browse');
    } catch (err) {
      console.error('[usePeople] Error fetching people:', err);
      setError("Error al cargar los personajes.");
      setAllPeople([]);
    } finally {
      setLoading(false);
    }
  };

  // Search people by query
  const searchPeople = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiGet.get(`/api/people?search=${query}`);
      // Backend returns: { total, next, previous, characters }
      const characters = data.characters || [];

      // Filter out characters that are already in favorites
      const favoriteIds = favorites.map(fav => fav.id);
      const filteredCharacters = characters.filter((char: Character) => !favoriteIds.includes(char.id));

      setSearchResults(filteredCharacters);
      setViewMode('search');
    } catch (err) {
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Load favorites with pagination
  const loadFavorites = async (page: number = 1) => {
    try {
      const { data } = await apiGet.get(`/api/favorites?page=${page}&pageSize=5`);
      // Backend returns: { page, pageSize, total, data }
      const favoritesData = data.data || [];
      const currentPageSize = data.pageSize || 5;
      const total = data.total || 0;

      // If requesting a page beyond available data, go back to page 1
      if (favoritesData.length === 0 && page > 1) {
        loadFavorites(1);
        return;
      }

      setFavorites(favoritesData);
      setFavoritesPage(data.page || page);

      // Calculate total pages from total count
      setFavoritesTotalPages(total > 0 ? Math.ceil(total / currentPageSize) : 1);
    } catch (err) {
      console.error("No se pudieron cargar favoritos");
      // On error, reset to page 1
      if (page > 1) {
        setFavoritesPage(1);
        setFavoritesTotalPages(1);
      }
    }
  };

  // Add favorite
  const addFavorite = async (character: Character) => {
    try {
      await apiPost.post('/api/favorites', character);
      loadFavorites(favoritesPage);

      // Remove from current view
      if (viewMode === 'search') {
        setSearchResults(prev => prev.filter(p => p.id !== character.id));
      } else {
        const updatedPeople = allPeople.filter(p => p.id !== character.id);
        setAllPeople(updatedPeople);

        // If the current page is now empty, load the next page to refill
        if (updatedPeople.length === 0) {
          if (peoplePage < peopleTotalPages) {
            // Load next page but keep the same page number for UI
            fetchAllPeople(peoplePage + 1);
          } else if (peoplePage > 1) {
            // If we're on the last page and it's empty, go back one page
            handlePeoplePageChange(peoplePage - 1);
          }
        }
      }
    } catch (err) {
      setError("Este personaje ya está en tus favoritos.");
    }
  };

  // Remove favorite
  const removeFavorite = async (character: Character) => {
    try {
      await apiPost.delete(`/api/favorites/${character.id}`);

      // Check if we are deleting the last item on the current page
      if (favorites.length === 1 && favoritesPage > 1) {
        // Go back one page
        loadFavorites(favoritesPage - 1);
      } else {
        // Reload current page
        loadFavorites(favoritesPage);
      }

      // Add back to current view if applicable
      if (viewMode === 'search') {
        const isInSearch = searchResults.some(result => result.id === character.id);
        if (!isInSearch) {
          // If search logic was complex we might need to re-search
          // but for now simplest is to do nothing or re-fetch search
        }
      } else {
        // Add back to Browse view list
        // We need to fetch the page again to respect sort order, or just prepend it
        // Simpler for now: refresh current people page
        fetchAllPeople(peoplePage);
      }

    } catch (err) {
      console.error(err);
      setError("Error al eliminar de favoritos.");
    }
  };

  // Page change handlers
  const handlePeoplePageChange = (page: number) => {
    setPeoplePage(page);
    fetchAllPeople(page);
  };

  const handleFavoritesPageChange = (page: number) => {
    setFavoritesPage(page);
    loadFavorites(page);
  };

  // Clear error manually
  const clearError = () => {
    setError(null);
  };

  return {
    // Data
    searchResults,
    allPeople,
    favorites,

    // Pagination state
    peoplePage,
    peopleTotalPages,
    favoritesPage,
    favoritesTotalPages,

    // UI state
    loading,
    error,
    viewMode,

    // Actions
    searchPeople,
    fetchAllPeople,
    addFavorite,
    removeFavorite,
    loadFavorites,
    handlePeoplePageChange,
    handleFavoritesPageChange,
    setViewMode,
    clearError,
  };
};