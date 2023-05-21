import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

function Login() {
  const [isLoginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [userNameInput, setUserNameInput] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const enableButton = ({ target }) => {
    const minimumCharacters = 3;
    const inputValue = target.value;
    setUserNameInput(inputValue);
    setLoginButtonDisabled((inputValue.length < minimumCharacters));
    console.log(userName);
  };

  const handleLoginButton = async () => {
    setLoading(true);
    setUserName(userNameInput);
    await createUser({ name: userNameInput });
    setLoading(false);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/search" />;
  }

  return (
    <div data-testid="page-login">
      <div>
        <input
          data-testid="login-name-input"
          placeholder="Digite seu nome"
          onChange={ enableButton }
        />
        <button
          data-testid="login-submit-button"
          disabled={ isLoginButtonDisabled }
          onClick={ handleLoginButton }
        >
          Entrar
        </button>
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default Login;
