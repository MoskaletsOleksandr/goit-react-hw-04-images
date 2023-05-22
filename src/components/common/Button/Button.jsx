import PropTypes from 'prop-types';
import { ButtonStyled, ButtonLabel } from './Button.styled';

export const Button = ({ loadMore, children }) => {
  return (
    <ButtonStyled onClick={loadMore}>
      <ButtonLabel>{children}</ButtonLabel>
    </ButtonStyled>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
  children: PropTypes.string.isRequired,
};
