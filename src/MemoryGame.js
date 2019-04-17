import React, { Component } from 'react';

import shuffle from 'shuffle-array';

import './App.css';

import Navbar from "./components/Navbar";
import Card from "./components/Card";

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

class App extends Component {

  constructor(props) {

    super(props);

    let cards = [
      {id:0, cardState: CardState.HIDING, backgroundColor:"red"},
      {id:1, cardState: CardState.HIDING, backgroundColor:"red"},
      {id:2, cardState: CardState.HIDING, backgroundColor:"navy"},
      {id:3, cardState: CardState.HIDING, backgroundColor:"navy"},
      {id:4, cardState: CardState.HIDING, backgroundColor:"green"},
      {id:5, cardState: CardState.HIDING, backgroundColor:"green"},
      {id:6, cardState: CardState.HIDING, backgroundColor:"yellow"},
      {id:7, cardState: CardState.HIDING, backgroundColor:"yellow"},
      {id:8, cardState: CardState.HIDING, backgroundColor:"black"},
      {id:9, cardState: CardState.HIDING, backgroundColor:"black"},
      {id:10, cardState: CardState.HIDING, backgroundColor:"purple"},
      {id:11, cardState: CardState.HIDING, backgroundColor:"purple"},
      {id:12, cardState: CardState.HIDING, backgroundColor:"pink"},
      {id:13, cardState: CardState.HIDING, backgroundColor:"pink"},
      {id:14, cardState: CardState.HIDING, backgroundColor:"lightskyblue"},
      {id:15, cardState: CardState.HIDING, backgroundColor:"lightskyblue"},
    ];

    cards = shuffle(cards);
    this.state = {cards};

  }

  handleNewGame = () => {

    let cards = this.state.cards.map(c => ({
        ...c,
        cardState: CardState.HIDING
    }));

    cards = shuffle(cards);
    this.setState({cards});
  }

  handleClick = (id) => {
    

    //Helper function. Takes in all the cards, ids to change and what the new state should be.
    const mapCardState = (cards, idsToChange, newCardState) => {

      return cards.map(c => {
        if(idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          }
        }
        return c;
      });
    }

    //Get the found card.
    const foundCard = this.state.cards.find(c => c.id === id);

    //If they are no allowed to click or it isn't hiding dont do anything.
    if(this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }

    //Boolean for whether or not the user can click.
    let noClick = false;

    //Set the card that was clicked on to showing.
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

    //Get only the showing cards.
    const showingCards = cards.filter((c => c.cardState === CardState.SHOWING));

    //Ids of the showing cards.
    const ids = showingCards.map(c => c.id);

    //If there are two cards showing and they are matching.
    if(showingCards.length === 2 && showingCards[0].backgroundColor == showingCards[1].backgroundColor) {
      //Set the cards to matching
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } 
    //Else if there are two cards showing and they are not matching.
    else if(showingCards.length === 2) {

      //Get the hiding cards.
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);

      //Do not allow the use to click.
      noClick = true;

      //Se the states to cards and after that is done
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          //set the state of cards to HIDING after 1.3 seconds.
          this.setState({cards: hidingCards, noClick: false});
        }, 1300);
      });

      //Don't do anything.
      return;
    } 

    //This only happens if there is only 1 card showing or if there are 2 cards showing that match.
    this.setState({cards, noClick});

  }

  render() {

    const cards = this.state.cards.map(c => {
      return (
        <Card 
            key={c.id} {...c } 
            onClick={() => this.handleClick(c.id)} 
            showing={c.cardState !== CardState.HIDING} 
            backgroundColor={c.backgroundColor}
        />
      );
    });

    return (
      <div className="App">
        <Navbar newGame={this.handleNewGame}/>
        {cards}
      </div>
    );
  }
}

export default App;
