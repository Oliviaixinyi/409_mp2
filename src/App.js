import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchMoviesByTerm } from './api/tmdbApi';
import  PokemonList from "./components/PokemonList/PokemonList"

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    // const [pokemons, setPokemons] = useState([]);
    const [movies, setMovies] = useState([]);
    // const []

    useEffect(() => {
      const loadData = async () => {
          if (searchTerm) {
              try {
                  const data = await fetchMoviesByTerm(searchTerm);
                  setMovies(data);
              } catch (error) {
                  console.error('Failed to fetch movies by term:', error);
              }
          }
      };

      loadData();
  }, [searchTerm]);
  // console.log(movies)


    return (
        <div className="App">
            <div className='search-bar-container'>
                <SearchBar onSearch={setSearchTerm} />
            </div>
            <div className='switch'>
                <div>Route
                    {searchTerm.length > 0 && movies && movies.length > 0 && <PokemonList pokemons={movies} />}
                    {/* <div className>list</div> */}
                    <div>GalleryView</div>
                </div>
            </div>
        </div>
    );
}

export default App;

