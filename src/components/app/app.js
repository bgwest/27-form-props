import "@babel/polyfill"; // was needed for es5 polyfill for async/await
import React from 'react';
import superagent from 'superagent';
import Header from '../header/header';
import RedditCard from '../reddit-card/reddit-card';
import RedditSearch from '../reddit-search/reddit-search';

// !: = development notes

// !: in code, components are classes that extend from React.Component

class App extends React.Component {
  // !: props are the main way of communication in REACT
  constructor(props) {
    super(props); // !: Initialize everything on React's side of the component

    this.state = {};
    this.state.redditQuery = [ { name: 'cats', searchLimit: 20 } ]; // default value is cats, 20 : )
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
    const REDDIT_API = `https://www.reddit.com/r/${this.state.redditQuery[0].name}.json?limit=${this.state.redditQuery[0].searchLimit}`;
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

  handleUpdateSearchQuery = async (originalName, newName) => {
    console.log(originalName);
    console.log(newName);
    await this.setState((previousState) => {
      console.log(previousState);
      return {
        redditQuery: previousState.redditQuery.map(currentItem => {
          console.log('anything');
          return currentItem.name === originalName ? {...currentItem, name: newName} : currentItem;
        }),
      }
    });
    await this.initialSearchQuery();
  };

  // !: React components NEED to have one render function in every component
  render() {
    return (
      <main>
        <Header/> {/* new Header().render();*/}
        {
          this.state.redditQuery.map((currentSearch, index) =>
          <RedditSearch
              redditQuery={currentSearch}
              handleUpdateSearchQuery={this.handleUpdateSearchQuery}
          />
          )
        }
        <ul>
          {
            this.state.searchFeed.map((currentFeed, index) =>
              <RedditCard
                searchFeed = {currentFeed}
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
