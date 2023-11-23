import React, { Component } from 'react';
import { Notify } from 'notiflix';

import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './Api';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showBtn: false,
    showModal: false,
    largeImageURL: '',
  };

  onSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.search.value;

    this.setState({
      query,
      page: 1, // numer strony: 1
      isLoading: true,
      images: [],
    });

    this.fetchGallery(query, this.state.page);
  };

  onNextPage = () => {
    const { query, page } = this.state;

    this.setState({
      page: page + 1,
      isLoading: true,
    });

    this.fetchGallery(query, page + 1);
  };

  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  fetchGallery = (query, page) => {
    fetchImages(query, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response],
          showBtn: response.length === 12,
        }));

        if (response.length === 0) {
          Notify.failure('No matches found!');
        }
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { images, isLoading, showBtn, showModal, largeImageURL } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} onClickImage={this.onClickImage} />
        {isLoading && <Loader />}
        {showBtn && <Button onNextPage={this.onNextPage} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    );
  }
}
