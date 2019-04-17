import React, { Component } from 'react';

import PropTypes from "prop-types";

import '../css/Navbar.css';

//Stateless functional component.
const Navbar = ({newGame}) => {
    
    return (
        <header>
        <h2><a>Memory Game</a></h2>
        <nav>
        <li><a onClick={newGame}>New Game</a></li>
        </nav>
    </header>
    );
};
//Proptypes.
Navbar.propTypes= {
    newGame: PropTypes.func.isRequired
}
 
export default Navbar;