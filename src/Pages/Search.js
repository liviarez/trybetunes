import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    isButtonSearchDisable: true,
  };

  validateSearchButton = ({ target }) => {
    console.log('search target', target);
    const minimumCharacters = 2;
    const inputValue = target.value;
    this.setState({
      isButtonSearchDisable: inputValue.length < minimumCharacters,
    });
  };

  render() {
    const { isButtonSearchDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ this.validateSearchButton }
          />
          <button
            data-testid="search-artist-button"
            disabled={ isButtonSearchDisable }
          >
            Pesquisar:
          </button>
        </form>
      </div>
    );
  }
}
