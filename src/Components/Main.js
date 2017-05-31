import React, { Component } from 'react';

import Timer from './Timer';

import '../Style/Main.css';
import map from '../Assets/img/map-indicators.png';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timerStarted: false,
      elapsed: 0,
      pause: false,
      time: '00:00',
    }
  }


  componentDidMount() {
    const start = Date.now();
    this.setState({
      start: start
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({elapsed: this.state.elapsed + 1});

    this.setState({
      time : this.formatTime(this.state.elapsed)
    });
  }


  startTimer() {
    this.setState({
      timerStarted: true
    });
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  controlTimer() {
    this.setState({
      pause: !this.state.pause
    });
    if (!this.state.pause) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(this.tick.bind(this), 1000);
    }
  }

  resetTimer() {
    clearInterval(this.timer);
    this.setState({
      elapsed: 0,
      time: 0,
      pause: false,
      timerStarted: false
    });
  }

  formatTime(time) {
    let addZero = function(number) {
      if (number < 10) {
        return '0' + number;
      } else {
        return number
      }
    }

    let s = time;
    let m = '0';
    let h = '0';

    

    let formatedTime = addZero(m) + ':' + addZero(s);
    return formatedTime;
  }


  render() {
    return (
      <main className="container">
        {/* <h4 className="nav-title deep-orange-text text-lighten-5 center-align">
        Welcome to Dota Support
      </h4> */}
      <div className="timer center-align">
        <h4 className="trajan">
          {this.state.time}
        </h4>
      </div>
      <div className="img-container center-align">
        <img src={map} alt=""/>
      </div>

      <Timer timerStarted={this.state.timerStarted}
        startTimer={this.startTimer.bind(this)}
        controlTimer={this.controlTimer.bind(this)}
        pause={this.state.pause}
        elapsed={this.state.elapsed}
        resetTimer={this.resetTimer.bind(this)}
      />


    </main>
  );

  }
};
