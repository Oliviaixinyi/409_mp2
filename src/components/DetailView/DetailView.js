
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailView.css';
const BASE_URL = 'https://image.tmdb.org/t/p/w1280'; 



function MovieDetail() {

    const navigate = useNavigate();
    const { movieId } = useParams(); // assuming the param you pass in the route is named "movieId"
    const allMovies = JSON.parse(localStorage.getItem('tmdb_all_movies'));
    const movieData = allMovies[movieId];
    const movieIds = Object.keys(allMovies);
    const [currentIndex, setCurrentIndex] = useState(movieIds.indexOf(movieId));

    const handleNext = () => {
        if (currentIndex < movieIds.length - 1) {
            setCurrentIndex(currentIndex + 1);
            navigate(`/movie/${movieIds[currentIndex + 1]}`);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            navigate(`/movie/${movieIds[currentIndex - 1]}`);
        }
    };

    return (
         <div className="movie-detail-modal">
             {/* <button onClick={handleNext}>&#8658;</button> */}
             <div className="movie-detail-header">
                <button onClick={handlePrev}>&#8656;</button>
                <button onClick={() => navigate('/gallery')}>Close</button>
                <button onClick={handleNext}>&#8658;</button>
            </div>
            <h2>{movieData.title}</h2>
            <img src={`${BASE_URL}${movieData.poster_path}`} alt={movieData.title} />
            <p>{movieData.overview}</p>
            {/* Add more movie details as needed */}
        </div>
    );
}

export default MovieDetail;
