import "@babel/polyfill"; // was needed for es5 polyfill for async/await
import React from 'react';
import superagent from 'superagent';
import Header from '../header/header';
import RedditCard from '../reddit-card/reddit-card';
import ReditSearch from '../redit-search/redit-search';

// !: = development notes

// !: in code, components are classes that extend from React.Component

class App extends React.Component {
  // !: props are the main way of communication in REACT
  constructor(props) {
    super(props); // !: Initialize everything on React's side of the component

    this.state = {};
    this.state.reditQuery = [ { name: 'cats', searchLimit: 20 } ]; // default value is cats, 20 : )
    this.state.searchFeed = [];

  }

  async componentDidMount(){
    await this.initialSearchQuery();

    console.log('searchFeed loaded!');
    console.log(this.state);
  }

  // aka load redit list
  initialSearchQuery = async () => {
    // !: an async function ALWAYS returns a promise
    // !: outside of this function, I can use await
    // https://www.reddit.com/r/cats.json?limit=${20}
    const REDDIT_API = `https://www.reddit.com/r/${this.state.reditQuery[0].name}.json?limit=${this.state.reditQuery[0].searchLimit}`;
    console.log(REDDIT_API);
    return superagent.get(REDDIT_API)
      .then(response => {
        console.log(response.body);
        if (response.body.data) {
          this.setState({searchFeed: response.body.data.children});
        } // else
        if (!response.body.data) {
          console.log('body.data is empty');
        }
      })
      .catch(console.error);
  };

  handleReRender() {
    this.setState(this.state);
  };

  handleUpdateSearchQuery = async (originalName, newName) => {
    console.log(originalName);
    console.log(newName);
    this.setState((previousState) => {
      console.log(previousState);
      return {
        reditQuery: previousState.reditQuery.map(currentPokemon => {
          console.log('anything');
          return currentPokemon.name === originalName ? {...currentPokemon, name: newName} : currentPokemon;
        }),
      }
    });
    await this.initialSearchQuery();
  };

  // !: this function takes A single pokemon and updates it in
  // !: the main pokemon list
  handlePokemonUpdate = (updatedPokemon) => {
    // !: using setState is required so that react can update the DOM
    this.setState((previousState) => {
      return {
        pokemon: previousState.pokemon.map(currentPokemon => {
          return currentPokemon.url === updatedPokemon.url ? updatedPokemon : currentPokemon
        }),
      }
    });
  };

  handleNameChange = (originalName, newName) => {
    this.setState((previousState) => {
      return {
        pokemon: previousState.pokemon.map(currentPokemon => {
          return currentPokemon.name === originalName ? {...currentPokemon, name: newName} : currentPokemon;
        }),
      }
    });
  };


  // !: React components NEED to have one render function in every component
  render() {
    return (
      <main>
        <Header/> {/* new Header().render();*/}
        {
          this.state.reditQuery.map((currentSearch, index) =>
          <ReditSearch
              reditQuery={currentSearch}
              handleUpdateSearchQuery={this.handleUpdateSearchQuery}
          />
          )
        }
        <ul>
          {
            this.state.searchFeed.map((currentFeed, index) =>
              <RedditCard
                searchFeed = {currentFeed}
                handlePokemonUpdate = {this.handlePokemonUpdate}
                handleNameChange = {this.handleNameChange}
              />
            )
          }
        </ul>
      </main>
    ); // !: every return function will return JSX
  }
}

// !: export default, means I'm only exporting ONE entity
export default App;
