import React from 'react';
import PropTypes from 'prop-types';

// !: = development notes

class PokemonForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.pokemonName = this.props.pokemon.name || '';
  }

  handleChange = event => {
    // !: EVERY CHANGE IN THE VIEW IT'S TIED TO STATE
    this.setState({pokemonName: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    // !: Here, I need to update state, based on my current state
    this.props.handleNameChange(this.props.pokemon.name, this.state.pokemonName);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="pokemonName"
          value={this.props.pokemonName}
          onChange={this.handleChange}
          type="text"
        />
        <button type="submit"> update name </button>
      </form>
    );
  }
}

PokemonForm.propTypes = {
  pokemon: PropTypes.object,
};

export default PokemonForm;
