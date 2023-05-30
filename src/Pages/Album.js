import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

export default class Album extends Component {
  state = {
    isLoading: true,
    artistAlbumInfo: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    // find specific url route
    this.callMusicAPI(id);
  }

  callMusicAPI = async (id) => {
    const apiResult = await getMusics(id);
    this.setState({
      isLoading: false,
      artistAlbumInfo: apiResult.filter((track) => track.wrapperType === 'track'),
    });
  };

  render() {
    const { isLoading, artistAlbumInfo } = this.state;
    if (isLoading) { return <Loading />; }
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistAlbumInfo[0].artistName}</h1>
        <h1 data-testid="album-name">{artistAlbumInfo[0].collectionName}</h1>
        {
          artistAlbumInfo.map((track) => (
            <MusicCard
              key={ track.trackId }
              previewUrl={ track.previewUrl }
              trackName={ track.trackName }
              trackId={ track.trackId }
              song={ track }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
