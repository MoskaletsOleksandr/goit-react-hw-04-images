import PropTypes from 'prop-types';
import { Item, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  alt,
  openModal,
}) => {
  return (
    <Item
      onClick={() => {
        openModal(largeImageURL, alt);
      }}
    >
      <GalleryImg src={webformatURL} alt={alt} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
