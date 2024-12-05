const API_KEY = '0aead095f12020638d4ce7acb388591f';

class TMDB {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.themoviedb.org/3';
  }

  /**
   * @param {string} endpoint 
   * @param {number} limit 
   * @param {number} initialPage 
   * @returns {Promise<Array>}
   */

  async fetchMovies(endpoint, limit = 20, initialPage = 1) {
    const movies = [];
    let page = initialPage;

    try {
      while (movies.length < limit) {
        const url = `${this.baseUrl}/movie/${endpoint}?api_key=${this.apiKey}&language=en-US&page=${page}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch movies from endpoint: ${endpoint}`);
        }
        const data = await response.json();

        movies.push(...data.results);

        if (movies.length >= limit) {
          break;
        }

        page += 1;
      }

      return movies.slice(0, limit); 
    } catch (error) {
      console.error(`Error fetching movies from endpoint: ${endpoint}`, error.message);
      return [];
    }
  }

  /**
   * @param {number} id -
   * @returns {Promise<Object|null>} 
   */

  async fetchMovieDetail(id) {
    try {
      const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movie detail.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie detail:', error.message);
      return null;
    }
  }
}

const tmdb = new TMDB(API_KEY);

/**
 * @param {number} limit 
 * @returns {Promise<Array>} 
 */

export const fetchNowShowingMovies = (limit) =>
  tmdb.fetchMovies('now_playing', limit, 1);

/**
 * @param {number} limit
 * @returns {Promise<Array>} 
 */

export const fetchUpcomingMovies = (limit) =>
  tmdb.fetchMovies('upcoming', limit, 3);

/**
 * @param {number} id 
 * @returns {Promise<Object|null>} 
 */
export const fetchMovieDetail = (id) => tmdb.fetchMovieDetail(id);
