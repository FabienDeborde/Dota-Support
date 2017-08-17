import React, { Component } from 'react';

import Header from './Components/Header';
import Main from './Components/Main';
//import Footer from './Components/Footer';

import './Style/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mute: false
    }
  }

  changeSound() {
    this.setState({
      mute: !this.state.mute
    })
  }

  render() {
    return (
      <div className="App black">

        <Header mute={this.state.mute} changeSound={this.changeSound.bind(this)}/>

        <Main mute={this.state.mute}/>

        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
