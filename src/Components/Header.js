import React from 'react';
import '../Style/Header.css';
import logo from '../Assets/img/logo.png';

const Header = (props) => {
  return (
    <header>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper black">
            <div className="header-container">
              <a href="./" className="logo">
                <img src={logo} alt="Dota 2 Official Logo"/>
              </a>

              <button className="btn-floating waves-effect waves-light red darken-4 mute"
                onClick={props.changeSound}>
                {
                  (props.mute) ?
                  <i className="material-icons right">volume_off</i>
                  :
                  <i className="material-icons right">volume_up</i>
                }
              </button>
            </div>
          </div>
        </nav>
      </div>

    </header>
  );
};

export default Header;
