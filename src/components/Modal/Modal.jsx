import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './Model.module.css';

const Modal = ({ onModalClose, largeImageURL }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.keyCode === 27) {
        onModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const handleClose = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default Modal;
