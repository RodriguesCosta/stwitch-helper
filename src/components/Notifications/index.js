import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTimeout } from 'timers';

class Notifications extends Component {
  handleClose = e => {
    e.preventDefault();
    this.props.dispatch({
      type: 'SHOW_NOTIFICATION',
      notification: {
        show: false
      }
    });
  };

  render = () => {
    const { notfy } = this.props;

    if (notfy.show) {
      setTimeout(() => {
        this.props.dispatch({
          type: 'SHOW_NOTIFICATION',
          notification: {
            show: false
          }
        });
      }, 2000);
    }

    return notfy.show ? (
      <div
        style={{
          position: 'fixed',
          width: '400px',
          top: '20px',
          right: '20px'
        }}
      >
        <div className={`alert alert-${notfy.type}`}>
          <button type="button" className="close" onClick={this.handleClose}>
            ×
          </button>
          <h4>
            <i className={`icon fa fa-${notfy.faIcon}`} /> {notfy.title}
          </h4>
          {notfy.message}
        </div>
      </div>
    ) : (
      <></>
    );
  };
}

export default connect(state => ({
  notfy: state.notifications
}))(Notifications);
