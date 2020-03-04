import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
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
      <li
        key={id}
        className={classAttributes}
        // onClick={this.changeChannel(id)}
      >
        {name}
        {!removable && (
          <button onClick={this.showModal} type="button" className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        )}
        <div />
      </li>
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
        <ul className="list-group list-group-flush">
          {channels.map((c) => this.renderChannel(c, currentChannelId))}
        </ul>
      </div>
    );

    return vdom;
  }
}

export default connect(mapStateToProps, actionCreators)(Channels);
