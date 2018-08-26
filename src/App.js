import React, { Component, createRef } from 'react';
import styled from 'styled-components';

import './App.css';

const StyledButton = styled.button`
  background-color: red;
  color: white;
  outline: none;
  padding: 10px;
  text-transform: uppercase;
  transition: all .3s ease-in-out;

  &:hover {
    background-color: black;
    border-color: red;
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  position: absolute;
  top: -9999px;
`

/*
  TODO:

  - Separate into smaller components
  - Add more words
  - Add score

*/

const glossary = [
  'feel',
  'house',
  'car',
  'pool',
  'fetch',
  'pull',
  'push',
  'hi',
  'you',
  'her',
  'ams'
];

class App extends Component {
  state = {
    index: 0,
    currentWord: glossary[0].split(''),
    isGameActive: false
  };

  inputRef = createRef();

  startGame = () => {
    setTimeout(() => {
      this.setState({ isGameActive: true });
      this.inputRef.current.focus();

      // comp => this.input = comp
    }, 1000);
  }

  updateWord = previousWordLength => {
    const { index } = this.state;

    // handles the case where the user types the last letter
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
    const { currentWord, isGameActive } = this.state;

    return (
      <div className="App">
        {
          isGameActive
            ? <div>
                <h1>Go!</h1>
                <p>Current word: {currentWord}</p>
              </div>
            : <h1>Speed typing game. Press start when ready</h1> 
        }

        <StyledButton onClick={this.startGame}>Start</StyledButton>

        <StyledInput type="text" innerRef={this.inputRef} onChange={this.handleTyping} />
      </div>
    );
  }
}

export default App;
