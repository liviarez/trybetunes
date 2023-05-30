import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Pesquisar from '../components/Pesquisar';

export default class Search extends Component {
  state = {
    isButtonSearchDisable: true,
    artistName: '',
    savedArtistName: '',
    isLoading: false,
    resultAPI: [],
  };

  validateSearchButton = ({ target }) => {
    const minimumCharacters = 2;
    const inputValue = target.value;
    this.setState({
      isButtonSearchDisable: inputValue.length < minimumCharacters,
    });
  };

  requestSearchAlbum = async () => {
    const { artistName } = this.state;
    this.setState({
      isLoading: true,
      savedArtistName: artistName,
    });
    const teste = await searchAlbumsAPI(artistName);
    this.setState({
      artistName: '',
      isLoading: false,
      resultAPI: teste,
    });
  };

  render() {
    const { isButtonSearchDisable, resultAPI, isLoading, savedArtistName } = this.state;
    return (
      isLoading ? <Loading /> : (
        <div data-testid="page-search">
          <Header />
          <form>
            <input
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              onChange={ this.validateSearchButton }
              value={ artist }
              name="artist"
            />
            <button
              data-testid="search-artist-button"
              disabled={ isButtonSearchDisable }
              onClick={ this.requestSearchAlbum }
              type="button"
            >
              Pesquisar:
            </button>
          </form>
        </div>

      )
    );
  }
}
