import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Pesquisar extends Component {
  render() {
    const { imagem, artistName, id } = this.props;
    return (
      <div>
        <img src={ imagem } alt="" />
        <p>{artistName}</p>
        <Link
          to={ `/album/${id}` }
          data-testid={ `link-to-album-${id}` }
        />
      </div>
    );
  }
}
Pesquisar.propTypes = {
  imagem: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,

};
