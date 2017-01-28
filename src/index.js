import React from 'react';
import {TabView} from './containers';
import {Provider} from 'react-redux';
import {store} from './store';

export default tabView = () => (
  <Provider store={store}>
    <TabView />
  </Provider>
)
