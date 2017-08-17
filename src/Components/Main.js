import React, { Component } from 'react';

import Timer from './Timer';
//import Timing from './Timing';

import '../Style/Main.css';
import map from '../Assets/img/map-indicators.png';
import stack from '../Assets/audio/stack.mp3';
import rune from '../Assets/audio/rune.mp3';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timerStarted: false,
      elapsed: -10,
      minutesElapsed: 0,
      start: 0,
      pause: false,
      time: '- 00:10',
      zoomedIn: false,
    }
  }

  //
  componentDidMount() {
    const start = Date.now();
    this.setState({
      start: start
    })
  }

  // Stop the timer when unmounting
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // Ticking function
  tick() {
    // Increment elapsed state by 1 every second
    this.setState({elapsed: this.state.elapsed + 1});

    // Update the time state (formatted time) based on elapsed new state
    this.setState({time : this.formatTime(this.state.elapsed)});
  }

  // Start function
  startTimer() {
    this.setState({
      timerStarted: true
    });
    // Call the ticking function every seconds
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  // Pause function
  controlTimer() {
    // Update pause state
    this.setState({
      pause: !this.state.pause
    });

    if (!this.state.pause) { // If it's unpaused
      clearInterval(this.timer); // stop the timer
    } else { // If it's paused
      this.timer = setInterval(this.tick.bind(this), 1000); // Resume the timer
    }
  }

  // Stop function
  resetTimer() {
    clearInterval(this.timer); //Stop the timer
    // Reset the state
    this.setState({
      elapsed: -10,
      time: '- 00:10',
      pause: false,
      timerStarted: false,
    });
  }

  // // Update Timer
  // addTimer() {
  //   this.tick();
  // }
  // subTimer() {
  //   // Decrement elapsed state by 1 every second
  //   this.setState({elapsed: this.state.elapsed - 1});
  //
  //   // Update the time state (formatted time) based on elapsed new state
  //   this.setState({time : this.formatTime(this.state.elapsed)});
  // }


  // Time formatting function
  formatTime(time) {
    // Zero handling (and negative numbers handling)
    let addZero = function(number) {
      if (number < 0) {
        return '0' + number * -1;
      } else if (number < 10) {
        return '0' + number;
      } else {
        return number
      }
    }

    // Minutes handling
    let t = this.state.elapsed; //Store elapsed time temporarly
    let s = 0; // Store seconds
    if (t < 60) { // If elpased time under 1 min, then t = s
      s = t;
    } else { // Else s is equal to t % 60
      s = t % 60;
      if (t % 60 === 0) { // and when t%60 = 0 then it means 1 minute passed
        this.setState({minutesElapsed : this.state.minutesElapsed + 1})
      }
    }

    // At ?:40s play stack sound
    if (s === 40) {
      this.playSound('stack');
    }

    // Every 2 minutes at ?:48s play rune sound
    if (this.state.minutesElapsed % 2 !== 0 && s === 48) {
      this.playSound('rune');
    }

    // Store the new formatted time (using addZero and negative number handling)
    let formatedTime = addZero(this.state.minutesElapsed) + ':' + addZero(s);
    if (time < 0) {
      formatedTime = '- 00:' + addZero(s);
    }
    return formatedTime;
  }

  // Sound handling function
  playSound(soundName) {
    if (!this.props.mute) { // If the app is not in muted mode, play a sound
      if (soundName === 'stack') {
        const audio = new Audio(stack);
        audio.play();
      } else if (soundName === 'rune') {
        const audio = new Audio(rune);
        audio.play();
      }
    }
  }

  // Map zoom-in/out function
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
          <h4 className={this.state.zoomedIn + ' trajan'}>
            {this.state.time}
          </h4>
        </div>
        <div className="img-container center-align">
          <img
            id="map"
            onClick={this.zoom.bind(this)}
            className={this.state.zoomedIn}
            src={map}
            alt="DOta2 map with camps and pull timing"
          />
          {/* <div
            className="timing-container">
            <Timing level="hard" time="0:55" name="hard-1" />
            <Timing level="hard" time="0:55" name="hard-2" />
            <Timing level="hard" time="0:55" name="hard-3" />
            <Timing level="hard" time="0:55" name="hard-4" />
            <Timing level="hard" time="0:55" name="hard-5" />
            <Timing level="hard" time="0:55" name="hard-6" />
            <Timing level="medium" time="0:55" name="medium-1" />
            <Timing level="medium" time="0:55" name="medium-2" />
            <Timing level="medium" time="0:55" name="medium-3" />
            <Timing level="medium" time="0:55" name="medium-4" />
            <Timing level="medium" time="0:55" name="medium-5" />
            <Timing level="medium" time="0:55" name="medium-6" />
            <Timing level="small" time="0:55" name="small-1" />
            <Timing level="small" time="0:55" name="small-2" />
            <Timing level="ancient" time="0:55" name="ancient-1" />
            <Timing level="ancient" time="0:55" name="ancient-2" />
            <Timing level="ancient" time="0:55" name="ancient-3" />
            <Timing level="ancient" time="0:55" name="ancient-4" />

          </div> */}
        </div>

        <Timer timerStarted={this.state.timerStarted}
          startTimer={this.startTimer.bind(this)}
          controlTimer={this.controlTimer.bind(this)}
          // addTimer={this.addTimer.bind(this)}
          // subTimer={this.subTimer.bind(this)}
          pause={this.state.pause}
          elapsed={this.state.elapsed}
          resetTimer={this.resetTimer.bind(this)}
        />


    </main>
  );

  }
};
