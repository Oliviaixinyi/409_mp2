import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GalleryView.css';
const BASE_URL = 'https://image.tmdb.org/t/p/w1280'; 
const Initize_URL = "https://api.themoviedb.org/3/movie/now_playing"
const API_KEY = '527696e24194d05d10e45d7b79c1b94e';
const allMoviesCacheKey = 'tmdb_all_movies'

const GENRE_NAME_TO_ID = {
    'All': null,
    'Action': 28,
    'Animation': 16,
    'Comedy': 35,
    'Crime': 80,
    'Drama': 18,
    'Family': 10751,
    'Fantasy': 14,
    'Horror': 27,
    'Romance': 10749
   
};


function getAllLocalStorageData() {
    // const items = {};
    const cachedAllMovies = localStorage.getItem(allMoviesCacheKey);
    if (cachedAllMovies) {
        const items = JSON.parse(cachedAllMovies)
        return items;
    }
    try {
        const response = axios.get(`${Initize_URL}` , {
            params: {
                api_key: API_KEY
            }
        });
        localStorage.setItem(allMoviesCacheKey, JSON.stringify(response));

    }catch (error) {
        console.error('Error fetching movies by term:', error);
        throw error;
    }
    const items = JSON.parse(localStorage.getItem(allMoviesCacheKey));
    return items;
  

}

function GalleryView({genre}) {
    const [localStorageData, setLocalStorageData] = useState({});
    // console.log(`current genre is ${genre}`)
    const genreId = GENRE_NAME_TO_ID[genre];

    useEffect(() => {
        const data = getAllLocalStorageData();
        setLocalStorageData(data);
    }, []);
    // console.log("TEST CACHE  ", localStorageData)

    const navigate = useNavigate();

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div>
            {/* <h2 id='gallery_id'>Gallery View</h2> */}
            <ul className='movie-gallery'>
                {/* <h2>Gallery View</h2> */}
                {Object.entries(localStorageData)
                .sort((a,b) => {
                    const movieA = a[1];
                    const movieB = b[1];
                    return movieA.title.localeCompare(movieB.title);
                })
                .filter(([id, movie]) => {
                    // Check if the movie has poster_path
                    const hasPoster = movie && movie.poster_path;
                    // Check if the movie belongs to the selected genre
                    const isInGenre = !genreId || (movie.genre_ids && movie.genre_ids.includes(genreId));
                    return hasPoster && isInGenre;
                })
                .map(([id,movie]) => (
                    <li key = {id } onClick={() => handleMovieClick(id)}>
                         <Link to={`/movie/${id}`}> <img src={`${BASE_URL}${movie.poster_path}`} alt={movie.title} /></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
    
}

export default GalleryView;
