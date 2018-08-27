import React, { Component, createRef } from 'react';

import Button from './Button';
import Input from './Input';
import Message from './Message';
import glossary from './glossary';

import './App.css';

/*
  TODO:

  - Add score
  - Add a bit more styling

*/

const INTERVAL = 1000;

class App extends Component {
  state = {
    index: 0,
    maxIndex: glossary.length - 1,
    currentWord: glossary[0].split(''),
    isGameActive: false,
    mainMessage: '',
    finishedGame: false
  };

  inputRef = createRef();
  

  startGame = () => {
    let number = 3;
    this.setState({ mainMessage: 'Get ready...' });

    const countdown = setInterval(
      function() { // had to be an anonymous function, because I need to bind it to `this`
        if (number === 1) {
          clearInterval(countdown);

          // This timeout compensates the interval and the assynchronous 
          // behaviour of the state in react
          setTimeout(() => {
            // START!
            this.setState({ isGameActive: true });
            this.inputRef.current.focus();
          }, INTERVAL);
        }

        this.setState({ mainMessage: `${number}...` });
        number -= 1;
      }.bind(this),
      INTERVAL
    );
  }

  updateWord = previousWordLength => {
    const { index } = this.state;

    // when the user types the last letter we need to skip to the next word
    if (!previousWordLength) {
      this.setState({
        currentWord: glossary[index + 1].split(''),
        index: index + 1 // still need to tackle the case where there's no more words.
      });
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
    const { currentWord, isGameActive, mainMessage } = this.state;

    return (
      <div className="App">
        <h1>Speed typing game. Press start when ready</h1>

        {
          isGameActive
            ? <div>
                <h1>Go!</h1>
                <Message word={currentWord} />
              </div>
            : <h1>{mainMessage}</h1>
        }

        {!isGameActive && <Button onClick={this.startGame} />}

        <Input type="text" innerRef={this.inputRef} onChange={this.handleTyping} />
      </div>
    );
  }
}

export default App;
