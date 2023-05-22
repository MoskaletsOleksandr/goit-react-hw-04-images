import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';
import { PixabayAPI } from '../../services/pixabay-api';
import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/common/Button';
import { Loader } from 'components/common/Loader';
import { animateScroll } from 'react-scroll';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const pixabayAPI = new PixabayAPI();

export class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: Status.IDLE,
    totalHits: null,
  };

  componentDidUpdate(prevProps) {
    const prevWord = prevProps.searchedWord;
    const nextWord = this.props.searchedWord;

    if (prevWord !== nextWord) {
      this.setState({ status: Status.PENDING });
      pixabayAPI.searchedWord = nextWord;
      pixabayAPI.page = 1;

      pixabayAPI
        .fetchPhotos()
        .then(({ hits, totalHits }) =>
          this.setState({
            images: hits,
            status: Status.RESOLVED,
            totalHits,
          })
        )
        .catch(({ message }) =>
          this.setState({ error: message, status: Status.REJECTED })
        );
    }
  }

  handleMoreBtnClick = () => {
    this.setState({ status: Status.PENDING });
    pixabayAPI.page += 1;
    pixabayAPI.fetchPhotos().then(({hits}) =>
      this.setState(({ images }) => ({
        images: [...images, ...hits],
        status: Status.RESOLVED,
      }))
    );

    this.scrollMoreButton();
  };

  scrollMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  render() {
    const { images, status, error, totalHits } = this.state;

    if (status === 'idle') {
      return <h3>Enter a search query.</h3>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <>
          <List>
            {images &&
              images.map(({ id, tags, webformatURL, largeImageURL }) => {
                return (
                  <ImageGalleryItem
                    key={id}
                    alt={tags}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    openModal={this.props.openModal}
                  />
                );
              })}
          </List>
          {totalHits >= pixabayAPI.loadedPhotos() && (
            <Button type="button" loadMore={this.handleMoreBtnClick}>
              Load more
            </Button>
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return <h3>{error}</h3>;
    }
  }
}

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  searchedWord: PropTypes.string.isRequired,
};
