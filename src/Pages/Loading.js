import React, { Component } from 'react';
import { Spinner } from '@nextui-org/react';

export default class Loading extends Component {
  render() {
    return (
      <div className="flex gap-4">
        <Spinner
          label="Carregando..."
          color="primary"
          labelColor="primary"
        />
      </div>
    );
  }
}
