import React, { Component } from 'react';

import PropTypes from 'prop-types';

import "../css/Card.css";

class Card extends Component {
    
    constructor(props) {

        //Super.
        super(props);
        //PropTypes.
        Card.propTypes = {
            showing: PropTypes.bool.isRequired,
            backgroundColor: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired
        }
    }

    render() { 
        
        //Variable for style.
        let style = {};
        //If the card is showing.
        if(this.props.showing) {
            //set the background color = to the props background color.
            style.backgroundColor = this.props.backgroundColor;
        }

        return ( 
            <div 
                className="card"
                onClick={this.props.onClick}
                style={style}
            />
         );
    }
}
 
export default Card;