import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ openModal, images }) => {
  return (
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
  );
}

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};