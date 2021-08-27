import React from 'react';
import Letter from '../letter';
import Results from '../results';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      letters: 'abcdefghijklmnopqrstuvwxyz',
      gameStarted: false,
      runningTime: 0,
      startTime: null,
      intervalId: null,
      letterSplits: {},
      won: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleReset = this.handleReset.bind(this);
  };

  handleStart() {
    this.setState({
      gameStarted: true,
      startTime: Date.now(),
      won: false
    })
    this.timer()
  };

  handleInput(e) {
    if (!this.state.gameStarted) this.handleStart()

    const letterIdx = this.state.input.length;
    const letter = e.target.value[e.target.value.length - 1];
    if (e.target.value.toLowerCase() === this.state.letters.slice(0, letterIdx + 1)) {
      this.setState({
        input: e.target.value.toLowerCase()
      })
      this.handleSplit(letter);
    }

    if (e.target.value.toLowerCase() === this.state.letters) {
      this.handleWin();
    }
  };

  handleReset(e) {
    e.preventDefault();
    this.setState({
      input: '',
      gameStarted: false,
      runningTime: 0,
      startTime: null,
      intervalId: null,
      won: false
    });

    this.resetTimer();
  };

  handleWin() {
    this.resetTimer();
    this.setState({won: true});
  }

  nextLetter() {
    const letterIdx = this.state.input.length;
    return this.state.letters[letterIdx];
  };

  handleSplit(letter) {
    this.setState({
      letterSplits: Object.assign({}, this.state.letterSplits, {
        [letter.toLowerCase()]: (this.state.runningTime / 1000).toFixed(3)
      })
    })
  }

  timer() {
    this.setState({
      intervalId: setInterval(() => {
        this.setState({
          runningTime: Date.now() - this.state.startTime
        })
      }, 1)
    })
  };

  resetTimer() {
    clearInterval(this.state.intervalId);
    document.getElementById('game-form-input').focus();
  }

  render() {
    return(
      <section className="game">
        <h1>Type The Alphabet</h1>
        <h2>Typing game to see how fast you type. Timer starts when you do :)</h2>
        <section
          className="status"
          key={this.state.input}
          onClick={() => document.getElementById('game-form-input').focus()}
        >
          { this.nextLetter() ?
            <Letter currentLetter={this.nextLetter()} /> :
            <p className="winning-message">Success!</p>
          }
        </section>
        <form
          className="game-form"
          onSubmit={this.handleReset}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        >
          <input
            id="game-form-input"
            type="text"
            value={this.state.input}
            onChange={this.handleInput}
            onPaste={this.handleReset}
            placeholder='Type here. Pro tip: Press enter to restart'
            autoFocus
          />
          <input
            type="submit"
            value="Reset"
          />
        </form>
        <p className="time-elapsed">Time: { (this.state.runningTime / 1000).toFixed(3) }s</p>
        {
          this.state.won &&
            <Results
              runningTime = {this.state.runningTime}
              letterSplits = {this.state.letterSplits}
            />
        }
        <p className="matt">
          created by <a href="https://twitter.com/mttrms" target="_blank" rel="noopener noreferrer">@mttrms</a> – my best time: 1.39s!
        </p>
      </section>
    )
  }
}

export default Game;
