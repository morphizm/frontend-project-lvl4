import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { useClickAway } from 'react-use';
import * as actions from '../actions';
// import getModal from './modals';


const mapStateToProps = (state) => {
  const { channels: { allIds, byId }, currentChannelId } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const actionCreators = {
  changeCurrentChannel: actions.changeCurrentChannel,
};

class Channels extends React.Component {
  showModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('!')
  }

  changeChannel = (id) => () => {
    const { changeCurrentChannel } = this.props;
    changeCurrentChannel({ id });
  }

  renderChannel = (channel, currentChannelId) => {
    const {
      id, name, removable,
    } = channel;
    const classAttributes = cn({
      'list-group-item': true,
      active: id === currentChannelId,
    });
    // const Modal = getModal('adding');

    const vdom = (
      <div
        key={id}
        className={classAttributes}
      >
        <button className="btn" type="button" onClick={this.changeChannel(id)}>
          {name}
        </button>
        {!removable && (
          <button onClick={this.showModal} type="button" className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
    );
    return vdom;
  }

  render() {
    const { channels, currentChannelId } = this.props;
    const vdom = (
      <div className="card overflow-auto w-25">
        <div className="card-header">
          Channels:
          <button type="button" className="close">
            <span aria-hidden="true">+</span>
          </button>
        </div>
        <div className="list-group list-group-flush">
          {channels.map((c) => this.renderChannel(c, currentChannelId))}
        </div>
      </div>
    );

    return vdom;
  }
}

export default connect(mapStateToProps, actionCreators)(Channels);
