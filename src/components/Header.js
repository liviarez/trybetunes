import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../Pages/Loading';

export default class Header extends Component {
  state = {
    userName: '',
    isLoading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    console.log(user);
    this.setState({
      isLoading: false,
      userName: user.name,
    });
  }

  render() {
    const { isLoading, userName } = this.state;
    /*  if (isLoading) {
      return <Loading />;
    } */
    return (
      <header data-testid="header-component">
        {isLoading ? <Loading /> : <p data-testid="header-user-name">{userName}</p>}
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}
