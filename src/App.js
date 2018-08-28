import React, { Component, createRef } from 'react';

import Button from './Button';
import Input from './Input';
import Message from './Message';
import { stories } from './glossary';

import './App.css';

/*
  TODO:

  - Add score feature and leaderboard
  - Save players progress on some database
  - Improve styling
  - Add game types
  - Make it multiplayer (v2)

*/

const INTERVAL = 1000;

class App extends Component {
  state = {
    index: 0,
    maxIndex: stories.length - 1,
    currentWord: stories[0].split(''),
    game: {
      started: false,
      finished: false
    },
    showButton: true,
    mainMessage: '',
  };

  inputRef = createRef();

  startGame = () => {
    let number = 3;
    this.setState({
      mainMessage: 'Get ready...',
      showButton: false
    });

    const countdown = setInterval(
      function() { // had to be an anonymous function, because I need to bind it to `this`
        if (number === 1) {
          clearInterval(countdown);

          // This timeout compensates the interval and the assynchronous 
          // behaviour of the state in react
          setTimeout(() => {

            // START! (update state, focus the input, start timing the game)
            this.setState({ game: { started: true }});
            this.inputRef.current.focus();
            this.startGameDate = new Date();
          }, INTERVAL);
        }

        this.setState({ mainMessage: `${number}...` });
        number -= 1;
      }.bind(this),
      INTERVAL
    );
  }

  finishGame() {
    this.endGameDate = new Date();

    const timeElapsed = (
      this.endGameDate.getTime() - this.startGameDate.getTime()
    ) / 1000;

    console.log('timeElapsed: ', timeElapsed);
    this.timeElapsed = timeElapsed;
  }

  updateWord = previousWordLength => {
    const { index, maxIndex } = this.state;

    // when the user types the last letter we need to skip to the next word
    if (!previousWordLength) {
      if (index === maxIndex) {

        this.setState({ game: { finished: true } });
        this.finishGame();
      } else {

          this.setState({
            currentWord: stories[index + 1].split(''),
            index: index + 1
          });
      }
    }
  }

  handleTyping = e => {
    const { currentWord } = this.state;
    const lastLetterFromInput = e.currentTarget.value.split('').pop();
    const firstLetterFromCurrentWord = currentWord[0];

    if (lastLetterFromInput === firstLetterFromCurrentWord) {
      currentWord.shift(); // remove the matched letter from the word

      this.setState({ currentWord });
      this.updateWord(currentWord.length);
    }
  }

  render() {
    const { currentWord, game, showButton, mainMessage } = this.state;

    return (
      <div className="App">
        <h1>Speed typing game. Press start when ready</h1>

        {game.started
          ? <div className="word-section">
              <h1>Go!</h1>
              <Message word={currentWord} />
            </div>
          : <h1>{mainMessage}</h1>
        }

        { showButton && <Button onClick={this.startGame} /> }

        <Input type="text" innerRef={this.inputRef} onChange={this.handleTyping} />

        { game.finished && <p>You took {this.timeElapsed} seconds! Well done.</p> }
      </div>
    );
  }
}

export default App;
