import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Routes from './routes';

import GlobalStyle from './styles/global';

import apiStreamElements from './services/apiStreamElements';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Notifications from './components/Notifications';

import LoginToken from './pages/LoginToken';

function App() {
  return apiStreamElements.token ? (
    <Provider store={store}>
      <GlobalStyle />
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <Routes />
      </div>
      <Footer />
      <Notifications />
    </Provider>
  ) : (
      <Provider store={store}>
        <GlobalStyle />
        <LoginToken />
        <Notifications />
      </Provider>
    );
}

export default App;
