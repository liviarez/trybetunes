import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../Pages/Loading';

export default class MusicCard extends Component {
  state = {
    isFavorite: false,
    isLoading: false,

  };

  async componentDidMount() {
    const { trackId } = this.props;
    this.setState({
      isLoading: true,
    });
    const callFavoriteSongAPI = await getFavoriteSongs();
    this.setState({
      // hof: some - boolean
      isLoading: false,
      isFavorite: callFavoriteSongAPI.some((favorites) => favorites.trackId === trackId),
    });
  }

  isFavoriteChecked = async ({ target }) => {
    const { updateFavoriteSongList } = this.props;
    this.setState({
      isLoading: true,
      isFavorite: target,
    });
    const { song } = this.props;
    if (target.checked) {
      await addSong(song);
    } else {
      await removeSong(song);
      updateFavoriteSongList();
      // Ajuda da  monitoria.
    }
    this.setState({
      isLoading: false,
      isFavorite: target.checked,
    });
  };

  // API recebe Objeto do mesmo formato que recebe do getMusic
  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isFavorite } = this.state;
    if (isLoading) { return <Loading />; }
    return (
      <div>
        <label>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            type="checkbox"
            onChange={ this.isFavoriteChecked }
            checked={ isFavorite }
          />
          Favorita
        </label>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.string.isRequired,
  updateFavoriteSongList: PropTypes.func.isRequired,

};
