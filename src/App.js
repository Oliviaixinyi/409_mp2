import './App.css';
import React, { useState } from 'react';
import {SearchBar} from './components/SearchBar/SearchBar';
import { fetchPokemonsByTerm } from './api/pokemonAPI';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    const loadData = async () => {
        let data;

        // Check for cached data in localStorage
        const cachedData = localStorage.getItem('pokemons');

        if (cachedData) {
            data = JSON.parse(cachedData);
        } else {
          if (searchTerm) {
            try {
              const data = await fetchPokemonsByTerm(searchTerm);
              setPokemons(data);
          } catch (error) {
              console.error('Failed to fetch pokemons by term:', error);
          }

          }
            // try {
            //     data = await fetchAllPokemons();
            //     localStorage.setItem('pokemons', JSON.stringify(data)); // Cache the data
            // } catch (error) {
            //     console.error('Failed to load pokemons:', error);
            // }
        }

        setPokemons(data);
    };
    
    loadData();
}, []);
  return (
    <div className="App">
      <div className='search-bar-container'>
        {/* <div>search bar</div>
         */}
         <SearchBar onSearch={setSearchTerm}/>
         {searchTerm}
        
      </div>
      <div className='switch'>
        <div>Route
          <div classNa>list</div>
          <div>GalleryView</div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
