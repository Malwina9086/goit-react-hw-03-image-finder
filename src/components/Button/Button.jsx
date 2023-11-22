import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onNextPage }) => (
  <button type="button" className={css.Button} onClick={onNextPage}>
    Load more
  </button>
);

Button.propTypes = {
  onNextPage: PropTypes.func,
};

export default Button;
