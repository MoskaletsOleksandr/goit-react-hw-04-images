import PropTypes from 'prop-types';
import { Component } from 'react';
import { Bar, SearchForm, Input } from './SearchBar.styled';
import { Button } from 'components/common/Button';

export class SearchBar extends Component {
  state = {
    searchedWord: '',
  };

  handleWordChange = event => {
    this.setState({ searchedWord: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.searchedWord);
    this.setState({ searchedWord: '' });
  };

  render() {
    return (
      <Bar>
        <SearchForm onSubmit={this.handleSubmit}>
          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchedWord}
            onChange={this.handleWordChange}
          />
          <Button>Search</Button>
        </SearchForm>
      </Bar>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
