import React, { Component } from 'react';
import { connect } from 'react-redux';

import apiStreamElements from '../../services/apiStreamElements';

class Header extends Component {
  async componentDidMount() {
    const profile = await apiStreamElements.getProfile();

    this.props.dispatch({
      type: 'SET_DATA_STREAM_ELEMENTS',
      streamElements: {
        profile
      }
    });
  }

  handleLogout() {
    localStorage.removeItem('streamelementsconfig');
    document.location.reload(true);
  }

  render() {
    const { streamElements } = this.props;

    return (
      <div>
        <header className="main-header">
          <a href="#/" className="logo">
            <span className="logo-mini">
              <b>ST</b>H
            </span>

            <span className="logo-lg">
              <b>Stream</b>Helper
            </span>
          </a>

          <nav className="navbar navbar-static-top">
            <a
              href="#/"
              className="sidebar-toggle"
              data-toggle="push-menu"
              role="button"
            >
              <span className="sr-only">Toggle navigation</span>
            </a>

            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown user user-menu">
                  <a
                    href="#/"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <img
                      src={
                        streamElements.profile
                          ? streamElements.profile.avatar
                          : ''
                      }
                      className="user-image"
                      alt="User"
                    />
                    <span className="hidden-xs">
                      {streamElements.profile
                        ? streamElements.profile.displayName
                        : ''}
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="user-header">
                      <img
                        src={
                          streamElements.profile
                            ? streamElements.profile.avatar
                            : ''
                        }
                        className="img-circle"
                        alt="User"
                      />
                      <p>
                        {streamElements.profile
                          ? `${streamElements.profile.displayName}`
                          : ''}
                        <small>
                          {streamElements.profile
                            ? `${streamElements.profile.provider} - ${streamElements.profile.country}`
                            : ''}
                        </small>
                      </p>
                    </li>
                    {/* Menu Footer */}
                    <li className="user-footer">
                      <div className="pull-left" />
                      <div className="pull-right">
                        <button
                          type="button"
                          className="btn btn-danger btn-flat"
                          onClick={this.handleLogout}
                        >
                          Sair
                        </button>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default connect(state => ({
  streamElements: state.streamElements
}))(Header);
