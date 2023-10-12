import React from 'react';
import './PokemonList.css';

function PokemonList({ pokemons }) {
    return (
        <ul className="pokemon-list">
            {pokemons.map((pokemon,id) => (
                <li key={id}>{pokemon.title}</li>
            ))}
        </ul>
    );
}

export default PokemonList;