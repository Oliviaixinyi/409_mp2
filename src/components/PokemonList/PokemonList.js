import React from 'react';
import './PokemonList.css';

const BASE_URL = 'https://image.tmdb.org/t/p/w1280';

function PokemonList({ pokemons, filter, order }) {
    // console.log(`start of all filter and order  ${filter} ${order}`)
    const sortedPokemons = pokemons.sort((a, b) => {
        let result = 0; 
        if (filter === 'title') {
            // console.log("testing title  ",filter );
            // return a.title.localeCompare(b.title);
            result = a.title.localeCompare(b.title);
        } else if (filter === 'ranking') {
            // Assuming you have a ranking field in your data, adjust as needed
            // console.log("testing ranking ",filter );
            result = b.vote_average - a.vote_average;  
        }
        if (order === "descending"){
            return -result;
        }
        return result;
        // return 0;  // Default, no sorting
    });
    return (
        <ul className="pokemon-list">
            {sortedPokemons
            .filter((pokemon,id) => pokemon.poster_path && pokemon.vote_average)
            .map((pokemon,id) => (
                <li key={id}>
                    <img src={`${BASE_URL}${pokemon.poster_path}`} alt={pokemon.title} />
                    <div className='movie-info'> 
                        <h3 >{pokemon.title}</h3>
                        <h4 >{`Rating: ${pokemon.vote_average}`}</h4>
                    </div>
                </li>
                
            ))}
        </ul>
    );
}

export default PokemonList;