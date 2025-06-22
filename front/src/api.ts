const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface Cat {
  id: string;
  url: string;
  width?: number;
  height?: number;
}

interface Like {
  id?: number;
  cat_id: string;
  created_at?: string;
}

export const fetchCats = async (limit = 10): Promise<Cat[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cats?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch cats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cats:', error);
    return [];
  }
};

export const fetchFavorites = async (): Promise<Like[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/likes`);
    if (!response.ok) throw new Error('Failed to fetch favorites');
    return await response.json();
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
};

export const toggleLike = async (catId: string): Promise<void> => {
  try {
    const isLiked = await checkIfLiked(catId);
    
    const url = `${API_BASE_URL}/likes${isLiked ? `/${catId}` : ''}`;
    const method = isLiked ? 'DELETE' : 'POST';
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(!isLiked && { body: JSON.stringify({ cat_id: catId }) }),
    });

    if (!response.ok) throw new Error('Failed to toggle like');
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};

const checkIfLiked = async (catId: string): Promise<boolean> => {
  const favorites = await fetchFavorites();
  return favorites.some(fav => fav.cat_id === catId);
};