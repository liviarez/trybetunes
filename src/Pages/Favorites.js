import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    favoriteSongsList: [],
    isLoading: true,
  };

  async componentDidMount() {
    this.updateFavoriteSongList();
  }

  updateFavoriteSongList = async () => {
    this.setState({
      isLoading: true,
    });
    const callFavoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongsList: callFavoriteSongs,
    });
  };

  // ajuda na monitoria
  render() {
    const { isLoading, favoriteSongsList } = this.state;
    if (isLoading) { return <Loading />; }
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          favoriteSongsList.map((track) => (
            <MusicCard
              key={ track.trackId }
              previewUrl={ track.previewUrl }
              trackName={ track.trackName }
              trackId={ track.trackId }
              song={ track }
              updateFavoriteSongList={ this.updateFavoriteSongList }
            />
          ))
        }
      </div>
    );
  }
}
