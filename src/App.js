import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import SearchBar from './components/SearchBar/SearchBar';
import { fetchMoviesByTerm } from './api/tmdbApi';
import  PokemonList from "./components/PokemonList/PokemonList"
import GalleryView from "./components/GalleryView/GalleryView"
import DetailView from './components/DetailView/DetailView'

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState('title'); 
    const [order,setOrder] = useState('ascending');

    const genres_type = ['All','Action','Animation','Comedy','Crime','Drama','Family','Fantasy','Horror','Romance']
    const [genre,setGenre] = useState(genres_type[0]);
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
      <Router>
      <div className="App">
          <div className="navigation">
              <Link to="/search">Search</Link>
              <Link to="/gallery">Gallery</Link>
          </div>
          <Routes>
                    <Route path="/movie/:movieId" element={<DetailView />} />
                    <Route path="/search" element={
                        <div>
                             <div className='search-bar-container'><
                                SearchBar onSearch={setSearchTerm} />
                              </div> 
                              <div className="filter-section">
                                    <label>Sort by: </label>
                                    <select className='select-container'
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <option value="title">Title</option>
                                        <option value="ranking">Ranking</option>
                                    </select>
                                </div>
                                <div className='order-section'>
                                  <label>
                                  <h5>ascending</h5>
                                    <input 
                                        type="radio" 
                                        value="ascending" 
                                        checked={order === 'ascending'} 
                                        onChange={() => setOrder('ascending')} 
                                    />
                                  </label>
                                  <label>
                                  <h5>descending</h5>
                                      <input 
                                          type="radio" 
                                          value="descending" 
                                          checked={order === 'descending'} 
                                          onChange={() => setOrder('descending')} 
                                      />
                                  </label>
                                </div>
                              <div className='move-list'>
                                {searchTerm.length > 0 && movies && movies.length > 0 && <PokemonList pokemons={movies} filter={filter} order={order}/>} 
                              </div>
                        </div>
                    } />
                    
                    <Route path="/gallery" element={
                          <div className='gallery-list'>
                            <h2 id='gallery_id'>Gallery View</h2>
                            <div className="genre-navigation">
                                  {genres_type.map((type) => (
                                      <button 
                                          key={type} 
                                          data-active={type === genre} 
                                          onClick={() => setGenre(type)}>
                                          {type}
                                      </button>
                                  ))}
                              </div>
                              
                            <GalleryView genre={genre}/>
                          </div>
                      } />

                

                    {/* Default route */}
                    <Route path="/" element={
                      <div>
                         <div className='search-bar-container'><
                            SearchBar onSearch={setSearchTerm} />
                          </div> 
                          <div className="filter-section">
                                    <label>Sort by: </label>
                                    <select className='select-container'
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <option value="title">Title</option>
                                        <option value="ranking">Ranking</option>
                                    </select>
                            </div>
                          <div className='order-section'>
                            <label>
                              <input 
                                  type="radio" 
                                  value="ascending" 
                                  checked={order === 'ascending'} 
                                  onChange={() => setOrder('ascending')} 
                              />
                              Sort by Title
                          </label>
                          <label>
                              <input 
                                  type="radio" 
                                  value="descending" 
                                  checked={order === 'descending'} 
                                  onChange={() => setOrder('descending')} 
                              />
                              Sort by Ranking
                          </label>
                          </div>
                          <div className='move-list'>
                            {searchTerm.length > 0 && movies && movies.length > 0 && <PokemonList pokemons={movies} filter={filter}/>} 
                          </div>
                    </div>
                    } />
                </Routes>
      </div>
  </Router>
    );
}

export default App;

