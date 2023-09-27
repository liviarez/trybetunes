import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';

class Searchs extends Component {
  state = {
    isButtonSearchDisable: true,
    name: '',
    albums: [],
    isLoading: false,
  };

  requestSearchAlbum = async () => {
    const { name } = this.state;
    this.setState({
      isLoading: true,
    });
    const albums = await searchAlbumsAPI(name);
    console.log(albums);
    this.setState({
      isLoading: false,
      albums,
    });
  };

  validateSearchButton = ({ target }) => {
    const minimumCharacters = 2;
    const { name, value } = target;
    if (value.length >= minimumCharacters) {
      this.setState(() => ({
        [name]: value,
        isButtonSearchDisable: false,
      }));
    }
  };

  render() {
    const { isButtonSearchDisable, isLoading, albums, name } = this.state;
    return (
      isLoading ? <Loading /> : (
        <div data-testid="page-search">
          <Header />
          <form>
            <label>
              <input
                data-testid="search-artist-input"
                type="text"
                name="name"
                placeholder="O que você quer ouvir?"
                onChange={ this.validateSearchButton }
              />
              <Button
                color="primary"
                data-testid="search-artist-button"
                disabled={ isButtonSearchDisable }
                onClick={ this.requestSearchAlbum }
              >
                Pesquisar
              </Button>
            </label>
            {
              albums !== '' && (
                <div>
                  {albums.length !== 0
                    ? (
                      <div>
                        <p>{`Resultado de álbuns de:${name}`}</p>
                        {albums.map((artist, index) => (
                          <div key={ index }>
                            <p>{artist.colectionName}</p>
                            <Link
                              to={ `/album/${artist.collectionId}` }
                              data-testid={ `link-to-album-${artist.collectionId}` }
                            >
                              {artist.collectionName}
                              <img src={ artist.artworkUrl100 } alt="" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (<p>Nenhum álbum foi encontrado</p>)}
                </div>)
            }
          </form>
        </div>
      )
    );
  }
}
export default Searchs;
