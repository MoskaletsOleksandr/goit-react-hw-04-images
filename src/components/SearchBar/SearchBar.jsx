import PropTypes from 'prop-types';
import { useState } from 'react';
import { Bar, SearchForm, Input } from './SearchBar.styled';
import { Button } from 'components/common/Button';

export const SearchBar =({onSubmit}) => {
  const [searchedWord, setSearchedWord] = useState('');

  const handleWordChange = ({ target }) => {
    setSearchedWord(target.value.toLowerCase());
  };
  
  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(searchedWord);
    setSearchedWord('')
  };

    return (
      <Bar>
        <SearchForm onSubmit={handleSubmit}>
          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchedWord}
            onChange={handleWordChange}
          />
          <Button>Search</Button>
        </SearchForm>
      </Bar>
    );
  }

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
