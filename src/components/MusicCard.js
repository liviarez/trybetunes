import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    isFavorite: false,
  };

  changeFavoriteCheck = async ({ target }) => {
    const { song } = this.props;
    const isChecked = target.checked;
    this.setState({
      isLoading: true,
      isFavorite: isChecked,
    });
    if (isChecked) {
      await addSong(song);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite, isLoading } = this.state;
    if (isLoading) { return <Loading />; }
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.changeFavoriteCheck }
            checked={ isFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
