import React, { Component } from 'react';
import { connect } from 'react-redux';

import apiStreamElements from '../../services/apiStreamElements';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      streamelementsconfig: {
        token: ''
      }
    };
  }

  componentDidMount() {
    const streamelementsconfig = localStorage.getItem('streamelementsconfig');

    if (streamelementsconfig) {
      this.setState({ streamelementsconfig: JSON.parse(streamelementsconfig) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { streamelementsconfig } = this.state;

    if (prevState.streamelementsconfig !== streamelementsconfig) {
      localStorage.setItem(
        'streamelementsconfig',
        JSON.stringify(streamelementsconfig)
      );
    }
  }

  handleInputTokenChange = e => {
    this.setState({
      streamelementsconfig: {
        token: e.target.value
      }
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();

    try {
      const profile = await apiStreamElements.getProfile();
      if (profile.provider !== 'twitch') {
        this.setState({
          streamelementsconfig: {
            token: ''
          }
        });

        this.props.dispatch({
          type: 'SHOW_NOTIFICATION',
          notification: {
            show: true,
            faIcon: 'ban',
            type: 'danger',
            title: 'Token inválido',
            message: 'So aceito token Stream Elements da Twitch'
          }
        });
      } else document.location.reload(true);
    } catch (e) {
      this.setState({
        streamelementsconfig: {
          token: ''
        }
      });
      this.props.dispatch({
        type: 'SHOW_NOTIFICATION',
        notification: {
          show: true,
          faIcon: 'ban',
          type: 'danger',
          title: 'Token inválido',
          message: ''
        }
      });
    }
  };

  render() {
    const { streamelementsconfig } = this.state;

    return (
      <div>
        <div className="login-box">
          <div className="login-logo">
            <a className="text-light-blue" href="#/">
              <b>Stream</b>Helper
            </a>
          </div>

          <div className="login-box-body">
            <p className="login-box-msg">Coloque o token do Stream Elements</p>
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group has-feedback">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Token"
                  onChange={this.handleInputTokenChange}
                  value={streamelementsconfig.token}
                />
                <span className="fa fa-key form-control-feedback" />
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Main);
