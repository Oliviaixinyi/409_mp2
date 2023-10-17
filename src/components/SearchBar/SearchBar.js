import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';
import PropTypes from 'prop-types';

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        props.onSearch(event.target.value); // Update the parent component
    };

    return (
        <div className='input-wrapper'>
              <FaSearch id="search-icon" />
            <input
            type="text"
            className="search-input"
            placeholder="Search for a Pokemon..."
            value={searchTerm}
            onChange={handleInputChange}
        />
        </div>
        
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default SearchBar;
