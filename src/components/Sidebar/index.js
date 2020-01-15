import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sidebar extends Component {
  componentDidMount() {}

  render() {
    const { streamElements } = this.props;

    return (
      <div>
        <aside className="main-sidebar">
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image">
                <img
                  src={
                    streamElements.profile ? streamElements.profile.avatar : ''
                  }
                  className="img-circle"
                  alt="User"
                />
              </div>
              <div className="pull-left info">
                <p>
                  {streamElements.profile
                    ? streamElements.profile.displayName
                    : ''}
                </p>
                <a href="#/">
                  <i className="fa fa-circle text-success" /> Online
                </a>
              </div>
            </div>

            <ul className="sidebar-menu" data-widget="tree">
              <li className="header">Opções Principais</li>
              <li>
                <a href="#/LojaStreamElements">
                  <i className="fa fa-shopping-cart" />
                  <span>Loja StreamElements</span>
                </a>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    );
  }
}

export default connect(state => ({
  streamElements: state.streamElements
}))(Sidebar);
