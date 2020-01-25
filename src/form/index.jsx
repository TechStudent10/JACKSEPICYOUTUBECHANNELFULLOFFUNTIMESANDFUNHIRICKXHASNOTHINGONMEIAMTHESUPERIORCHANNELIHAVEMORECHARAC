import React from 'react';

import Letter from '../letter';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      letters: 'abcdefghijklmnopqrstuvwxyz'
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    const letterIdx = this.state.input.length;

    if (e.target.value === this.state.letters.slice(0, letterIdx + 1)) {
      this.setState({
        input: e.target.value
      })
    }

    if (e.target.value === this.state.letters) {
      console.log('you win!');
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({input: ''});
  };

  nextLetter() {
    const letterIdx = this.state.input.length;
    const letter = this.state.letters[letterIdx];
    return letter ? letter : null
  };

  render() {
    return(
      <section>{
        this.nextLetter() ?
          <Letter currentLetter={this.nextLetter()} /> :
          <p>Alphabet complete!</p>
        }
        <form onSubmit={this.handleSubmit}>
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
      </section>
    )
  }
}

export default Form;
