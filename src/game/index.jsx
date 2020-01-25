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
      intervalId: null
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
    if (e.target.value === this.state.letters.slice(0, letterIdx + 1)) {
      this.setState({
        input: e.target.value
      })
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
      <section>
        { this.nextLetter() ?
          <Letter currentLetter={this.nextLetter()} /> :
          <p>Alphabet complete!</p>
        }
        <form onSubmit={this.handleReset}>
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
        <p>Time: { this.state.runningTime / 1000 }</p>
      </section>
    )
  }
}

export default Game;
