import React, { Component } from 'react';
/* import { Redirect } from 'react-router-dom/cjs/react-router-dom'; */
import Header from '../components/Header';
/* import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI'; */

export default class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
      </div>
    );
  }
}
