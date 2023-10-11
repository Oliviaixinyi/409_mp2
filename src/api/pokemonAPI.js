import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonsByTerm = async (term) => {
    try {
        // Depending on the Pokemon API's capabilities, adjust this call
        const response = await axios.get(`${BASE_URL}/pokemon/${term}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pokemons by term:', error);
        throw error;
    }
};