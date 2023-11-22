import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import css from './Model.module.css';

const Modal = ({ onModalClose, largeImageURL }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleKeyDown = e => {
      if (
        e.key === 'Escape' ||
        e.keyCode === 27 ||
        e.currentTarget === e.target
      ) {
        onModalClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  return (
    <div ref={modalRef} className={css.Overlay} onClick={onModalClose}>
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
