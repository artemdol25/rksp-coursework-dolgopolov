import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Events.css';

class EventsPage extends Component {
 state = {
    creating: false
  };

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Добавить мероприятие"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <p>Содержимое формы</p>
          </Modal>
        )}
        <div className="events-control">
          <p>Создавайте свои мероприятия!</p>
          <button className="btn" onClick={this.startCreateEventHandler}>
            Создать мероприятие
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default EventsPage;