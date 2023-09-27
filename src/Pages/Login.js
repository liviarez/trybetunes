import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Input, Button, Switch } from '@nextui-org/react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginButtonDisabled: true,
      userName: '',
      isLoading: false,
      redirect: false,
    };
  }

  validateLoginButton = ({ target }) => {
    console.log(target.value);
    const minimumCharacters = 3;
    const inputValue = target.value;
    this.setState({
      userName: inputValue,
      isLoginButtonDisabled: inputValue.length < minimumCharacters,
    });
    /* if (inputValue.length >= minimumCharacters) {
      this.setState({ isLoginButtonDisabled: false });
    } */
  };

  saveAndRedirectButton = async () => {
    const { userName } = this.state;
    this.setState({ isLoading: true });
    this.setState({ userName });
    await createUser({ name: userName });
    this.setState({ isLoading: false, redirect: true });
  };

  render() {
    const { redirect, isLoginButtonDisabled, isLoading, userName } = this.state;

    if (redirect === true) {
      return <Redirect to="/search" />;
    }
    return (
      <div
        data-testid="page-login"
        className="flex justify-center items-center h-screen mx-auto"
      >
        <div>
          <Input
            className="py-2"
            data-testid="login-name-input"
            placeholder="Digite seu nome"
            value={ userName }
            onChange={ this.validateLoginButton }
          />
          <Button
            color="primary"
            data-testid="login-submit-button"
            disabled={ isLoginButtonDisabled }
            onClick={ this.saveAndRedirectButton }
          >
            Entrar
          </Button>
          <Switch defaultSelected className="px-2">
            Lembrar de mim
          </Switch>
          {isLoading ? <Loading /> : ''}
        </div>
      </div>
    );
  }
}

export default Login;
