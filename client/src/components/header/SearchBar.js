import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} style={styles.form}>
      <div style={styles.searchContainer}>
        <FaSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleInputChange}
          style={styles.input}
        />
        {searchTerm && (
          <FaTimes style={styles.clearIcon} onClick={handleClearSearch} />
        )}
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: '50px',
    padding: '10px 20px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  searchIcon: {
    color: '#888',
    marginRight: '10px',
    fontSize: '18px',
  },
  input: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    fontSize: '16px',
    color: '#333',
  },
  clearIcon: {
    color: '#888',
    cursor: 'pointer',
    fontSize: '18px',
  },
};

export default SearchBar;
