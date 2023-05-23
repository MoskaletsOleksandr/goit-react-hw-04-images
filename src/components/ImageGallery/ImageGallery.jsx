import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';
import { fetchPhotos } from '../../services/pixabay-api';
import { useState, useEffect, useRef } from 'react';
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

export const ImageGallery = ({ openModal, searchedWord }) => {
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
      console.log(isInitialLoadRef.current);

    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      console.log(isInitialLoadRef.current);

      return;
    }

    setStatus(Status.PENDING);
    setPage(1);

    const fetchData = async () => {
      try {
        const { hits, totalHits } = await fetchPhotos(searchedWord, page);

        setImages(hits);
        setTotalHits(totalHits);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    };

    fetchData();
  }, [searchedWord, page]);

  const handleMoreBtnClick = async () => {
    setStatus(Status.PENDING);
    setPage(prevPage => (prevPage += 1));
    const { hits } = await fetchPhotos(searchedWord, page);

    setImages(preImages => [...preImages, ...hits]);
    setStatus(Status.RESOLVED);

    scrollMoreButton();
  };

  const scrollMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  if (status === Status.IDLE) {
    return <h3>Enter a search query.</h3>;
  }

  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.RESOLVED) {
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
                  openModal={openModal}
                />
              );
            })}
        </List>
        {/* {totalHits >= images.length && (
            <Button type="button" loadMore={handleMoreBtnClick}>
              Load more
            </Button>
          )} */}
      </>
    );
  }

  if (status === Status.REJECTED) {
    return <h3>{error}</h3>;
  }
};

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  searchedWord: PropTypes.string.isRequired,
};
