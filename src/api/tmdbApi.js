import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/search';
const API_KEY = '527696e24194d05d10e45d7b79c1b94e';

export const fetchMoviesByTerm = async (term) => {
    const allMoviesCacheKey = 'tmdb_all_movies';
    const cachedAllMovies = localStorage.getItem(allMoviesCacheKey);

    if (cachedAllMovies) {
        const movies = JSON.parse(cachedAllMovies);
        console.log("ALL MOVIES  ", movies)

        // Filter movies that match the term
        const filteredMovies = movies.filter(movie => 
            movie.title && movie.title.toLowerCase().includes(term.toLowerCase())
        );

        // If we found movies in the cache, return them
        if (filteredMovies.length) {
            console.log("Using cached results for", term);
            return filteredMovies;
        }
    }

    // If no cached results found, make the API call
    try {
        const response = await axios.get(`${BASE_URL}/movie`, {
            params: {
                api_key: API_KEY,
                query: term
            }
        });

        const data = response.data.results;

        // Update the cached all movies
        if (cachedAllMovies) {
            const combinedMovies = [...JSON.parse(cachedAllMovies), ...data];
            localStorage.setItem(allMoviesCacheKey, JSON.stringify(combinedMovies));
        } else {
            localStorage.setItem(allMoviesCacheKey, JSON.stringify(data));
        }

        return data;
    } catch (error) {
        console.error('Error fetching movies by term:', error);
        throw error;
    }
};
