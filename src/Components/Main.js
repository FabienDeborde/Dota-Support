import React, { Component } from 'react';

import Timer from './Timer';

import '../Style/Main.css';
import map from '../Assets/img/map-indicators.png';
import stack from '../Assets/audio/stack.mp3';
import rune from '../Assets/audio/rune.mp3';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timerStarted: false,
      elapsed: 100,
      minutesElapsed: 0,
      pause: false,
      time: '00:00',
      zoomedIn: false,
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
      elapsed: 58,
      time: '00:00',
      pause: false,
      timerStarted: false,
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

    let t = this.state.elapsed;
    let s = 0;
    if (t < 60) {
      s = t;
    } else {
      s = t % 60;
      if (t % 60 === 0) {
        this.setState({minutesElapsed : this.state.minutesElapsed + 1})
      }
    }

    if (s === 40) {
      if (!this.props.mute) {
        //console.log('stack!');
        this.playSound('stack');
      }
    }

    if (this.state.minutesElapsed % 2 !== 0 && s === 48) {
      if (!this.props.mute) {
        //console.log('rune!');
        this.playSound('rune');
      }
    }

    let formatedTime = addZero(this.state.minutesElapsed) + ':' + addZero(s);
    return formatedTime;
  }

  playSound(soundName) {
    if (soundName === 'stack') {
      const audio = new Audio(stack);
      audio.play();
    } else if (soundName === 'rune') {
      const audio = new Audio(rune);
      audio.play();
    }
  }

  zoom() {
    this.setState({zoomedIn : !this.state.zoomedIn});
  }


  render() {
    return (
      <main className="container">
        {/* <h4 className="nav-title deep-orange-text text-lighten-5 center-align">
        Welcome to Dota Support
      </h4> */}
      <div className="timer center-align">
        <h4 className={this.state.zoomedIn + " trajan"}>
          {this.state.time}
        </h4>
      </div>
      <div className="img-container center-align">
        <img id="map" className={this.state.zoomedIn} onClick={this.zoom.bind(this)} src={map} alt=""/>
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
