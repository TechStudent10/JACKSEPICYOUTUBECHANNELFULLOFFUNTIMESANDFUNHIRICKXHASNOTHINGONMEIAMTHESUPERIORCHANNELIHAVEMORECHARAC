import React from 'react';

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
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({input: ''});
  }

  render() {
    return(
      <section>
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
