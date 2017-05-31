import React from 'react';

const Timer = (props) => {

  if (!props.timerStarted) {
    return (
      <div className="timer-wrapper">
        <button className="btn-large red darken-4 waves-effect waves-light"
          onClick={props.startTimer}>
          <i className="material-icons left">query_builder</i>
          Start Timer
        </button>
      </div>
    );
  } else {
    return (
      <div className="timer-wrapper">
        {(props.pause) ?
          <div className="buttons-wrapper">
            <button className="btn-floating btn-large waves-effect waves-light red darken-4"
              onClick={props.controlTimer}>
              <i className="material-icons left">play_arrow</i>
              Resume
            </button>
            <button className="waves-effect waves-light btn-large red darken-4"
              onClick={props.resetTimer}>
              <i className="material-icons left">restore</i>
              Reset
            </button>

          </div>
          :
          <div className="buttons-wrapper">
            <button className="btn-floating btn-large waves-effect waves-light red darken-4"
              onClick={props.controlTimer}>
                <i className="material-icons left">pause</i>
              Pause
            </button>
            <button className="btn-floating btn-large waves-effect waves-light red darken-4"
              onClick={props.resetTimer}>
                <i className="material-icons left">stop</i>
              Stop
            </button>
          </div>
        }

      </div>
    );
  }
};

export default Timer;
