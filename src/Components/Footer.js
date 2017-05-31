import React from 'react';
import '../Style/Footer.css';

const Footer = (props) => {
  return (

    <footer className="page-footer black">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="grey-text">Footer Content</h5>
            <p className="grey-text text-lighten-1">You can use rows and columns here to organize your footer content.</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="grey-text">Links</h5>
            <ul>
              <li><a className="grey-text text-lighten-1" href="http://blog.dota2.com/">Dota 2 Official Website</a></li>
              <li><a className="grey-text text-lighten-1" href="http://dota2.gamepedia.com/">Dota 2 WIKI</a></li>
              <li><a className="grey-text text-lighten-1" href="#!">Link 3</a></li>
              <li><a className="grey-text text-lighten-1" href="#!">Link 4</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2017 Copyright Nhoxx
        </div>
      </div>
    </footer>

  );
};

export default Footer;
