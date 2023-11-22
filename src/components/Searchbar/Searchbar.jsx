import React from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    onSubmit(inputValue);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormBtn}>
          <span className={css.SearchFormBtnLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
