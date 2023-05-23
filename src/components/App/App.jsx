import { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';

import { Container } from './App.styled';
import { SearchBar } from 'components/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/common/Modal';
import { Section } from 'components/common/Section';
import { Button } from 'components/common/Button';
import { Loader } from 'components/common/Loader';
import { fetchPhotos } from '../../services/pixabay-api';

export const App = () => {
  const [searchedWord, setSearchedWord] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [alt, setAlt] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchedWord) {
      return;
    }

    setLoading(true);
    const fetchData = async () => {
      try {
        const { hits, totalHits } = await fetchPhotos(searchedWord, page);
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchedWord, page]);

  const handleSearchFormSubmit = searchedWord => {
    setSearchedWord(searchedWord);
    setPage(1);
    setImages([]);
    setError(null);
    setTotalHits(null);
  };

  const handleMoreBtnClick = async () => {
    setPage(prevPage => prevPage + 1);
    scrollMoreButton();
  };

  const scrollMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const openModal = (largeImgURL, tags) => {
    toggleModal();
    setLargeImageURL(largeImgURL);
    setAlt(tags);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleSearchFormSubmit} />
      <Section>
        {loading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {error && <h3>{error}</h3>}
        {totalHits > images.length && (
          <Button type="button" loadMore={handleMoreBtnClick}>
            Load more
          </Button>
        )}
      </Section>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={alt} width={1100} height={800} />
        </Modal>
      )}
    </Container>
  );
};
