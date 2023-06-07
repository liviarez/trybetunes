import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    description: '',
    image: '',
    isButtonDisabled: false,
  };

  componentDidMount() {
    this.getUserStoraged();
  }

  getUserStoraged = async () => {
    const callGetUserInfo = await getUser();
    this.setState({
      /*     isLoading: false, */
      name: callGetUserInfo.name,
      email: callGetUserInfo.email,
      description: callGetUserInfo.description,
      image: callGetUserInfo.image,
    }, () => {
      this.enableSaveButton();
      this.setState({
        isLoading: false,
      });
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      // colchete deixa o value dinamico
      [name]: value,
    }, () => this.enableSaveButton());
  };

  verifyEmail = () => {
    const { email } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  verifyOthers = () => {
    const { name, email, description } = this.state;
    return name.length >= 1
    && email.length >= 1
    && description.length >= 1;
  };

  enableSaveButton = () => {
    this.setState({
      isButtonDisabled: this.verifyEmail() && this.verifyOthers(),
    });
  };

  handleClick = async () => {
    const { name, email, image, description } = this.state;
    const fetchUpdatedUserInfo = await updateUser({ name, email, description, image });
    this.setState({
      isLoading: true,
      name: fetchUpdatedUserInfo.name,
      email: fetchUpdatedUserInfo.email,
      description: fetchUpdatedUserInfo.description,
      image: fetchUpdatedUserInfo.image,
    });
    const { history } = this.props;
    history.push('/profile');
  };

  render() {
    const { isLoading, name, email, description, image, isButtonDisabled } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form>
          <input
            data-testid="edit-input-name"
            value={ name }
            name="name"
            // funcao que vai manipular a acao
            onChange={ this.handleChange }
            placeholder="Nome"
          />
          <input
            data-testid="edit-input-email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
            placeholder="E-mail"
          />
          <input
            data-testid="edit-input-description"
            value={ description }
            name="description"
            onChange={ this.handleChange }
            placeholder="Descrição"
          />
          <input
            data-testid="edit-input-image"
            value={ image }
            name="image"
            onChange={ this.handleChange }
            placeholder="Imagem"
          />
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ !isButtonDisabled }
            onClick={ this.handleClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = { history: PropTypes.shape({ push: PropTypes.func }).isRequired };
