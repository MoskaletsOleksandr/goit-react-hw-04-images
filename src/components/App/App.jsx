import { useState } from 'react';
import { Container } from './App.styled';
import { SearchBar } from 'components/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/common/Modal';
import { Section } from 'components/common/Section';

export const App = () => {
  const [searchedWord, setSearchedWord] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [alt, setAlt] = useState(null);

  const handleSearchFormSubmit = searchedWord => {
    setSearchedWord(searchedWord);
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
        <ImageGallery
          searchedWord={searchedWord}
          openModal={openModal}
        ></ImageGallery>
      </Section>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={alt} width={1100} height={800} />
        </Modal>
      )}
    </Container>
  );
};
