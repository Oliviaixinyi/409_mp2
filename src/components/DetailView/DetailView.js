import React from 'react';
import { useNavigate, useLocation,useParams } from 'react-router-dom';
import './DetailView.css';

const BASE_URL = 'https://image.tmdb.org/t/p/w1280';

function MovieDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { movieId } = useParams(); // Get the movieId from the URL
    const from = location.state?.from;
    const filteredMovies = location.state?.filteredMovies;
    // console.log(filteredMovies)



    // Find the movie based on movieId from the filteredMovies
    // if (from === "")
    const movieData = filteredMovies?.find(movie => movie.id.toString() === movieId);
    // const movieData = movieEntry 
    const currentIndex = filteredMovies?.findIndex(movie => movie.id.toString() === movieId);
    // console.log(`current index is ${currentIndex}`);
    // console.log(`movie data is ${movieData}`);
    // const currentIndex = filteredMovies?.findIndex(pokemon => pokemon.id.toString() === movieId);
    
    const handleNext = () => {
        if (currentIndex < filteredMovies.length - 1) {
            const nextMovie = filteredMovies[currentIndex + 1];
            navigate(`/movie/${nextMovie.id}`, { state: { from: from, filteredMovies: filteredMovies } });
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const prevMovie = filteredMovies[currentIndex - 1];
            navigate(`/movie/${prevMovie.id}`, { state: { from: from, filteredMovies: filteredMovies } });
        }
    };

    const handleClose = () => {
        if (from === 'GalleryView') {
            navigate('/gallery')
                    }
        else {
            navigate('/search')
            }
    }

    if (!movieData) return null;

    return (
        <div className="movie-detail-modal">
            <div className="movie-detail-header">
                <button onClick={handlePrev} disabled={currentIndex === 0}>&#8656;</button>
                <button onClick={handleClose}>Close</button>
                <button onClick={handleNext} disabled={currentIndex === filteredMovies.length - 1}>&#8658;</button>
            </div>
            <h2>{movieData.title}</h2>
            <img src={`${BASE_URL}${movieData.poster_path}`} alt={movieData.title} />
            <p>{movieData.overview}</p>
        </div>
    );
}

export default MovieDetail;
