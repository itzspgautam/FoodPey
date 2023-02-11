import React from 'react';
import Navigators from './src/Navigators';
import Store from './src/Store';
import {Provider} from 'react-redux';

export default () => (
  <Provider store={Store}>
    <Navigators />
  </Provider>
);
