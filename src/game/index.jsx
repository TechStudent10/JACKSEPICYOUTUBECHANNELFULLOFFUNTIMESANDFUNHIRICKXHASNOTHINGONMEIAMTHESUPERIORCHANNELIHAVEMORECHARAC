import React from 'react';
import Letter from '../letter';

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
      letterSplits: {}
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleReset = this.handleReset.bind(this);
  };

  handleStart() {
    this.setState({
      gameStarted: true,
      startTime: Date.now()
    })
    this.timer()
  };

  handleInput(e) {
    if (!this.state.gameStarted) this.handleStart()

    const letterIdx = this.state.input.length;
    const letter = e.target.value[e.target.value.length - 1];
    if (e.target.value === this.state.letters.slice(0, letterIdx + 1)) {
      this.setState({
        input: e.target.value
      })
      this.handleSplit(letter);
    }

    if (e.target.value === this.state.letters) {
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
      intervalId: null
    });

    this.resetTimer();
  };

  handleWin() {
    this.resetTimer();
  }

  nextLetter() {
    const letterIdx = this.state.input.length;
    return this.state.letters[letterIdx];
  };

  handleSplit(letter) {
    this.setState({
      letterSplits: Object.assign({}, this.state.letterSplits, {[letter]: this.state.runningTime})
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
  }

  render() {
    return(
      <section className="game">
        { this.nextLetter() ?
          <Letter currentLetter={this.nextLetter()} /> :
          <p className="winning-message">Alphabet complete!</p>
        }
        <form className="game-form" onSubmit={this.handleReset}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleInput}
          />
          <input
            type="submit"
            value="Reset"
          />
        </form>
        <p className="time-elapsed">Time: { (this.state.runningTime / 1000).toFixed(3) }s</p>
      </section>
    )
  }
}

export default Game;
