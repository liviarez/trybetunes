import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Favorites extends Component {
  state = {
    favoriteSongsList: [],
    isLoading: true,
  };

  // API Request
  // While waiting for the API, Loading true
  // MusicCArd rend favoritesonglist
  async componentDidMount() {
    const callFavoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongsList: callFavoriteSongs,
    });
  }

  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
      </div>
    );
  }
}
