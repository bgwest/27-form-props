import React from 'react';
import PropTypes from 'prop-types';


class RedditSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // name should always default to cats and if null is seen there is a problem
    this.state.searchQuery = this.props.redditQuery.name || 'null';
  }

  handleChange = event => {
    // !: EVERY CHANGE IN THE VIEW IT'S TIED TO STATE
    this.setState({searchQuery: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    // !: Here, I need to update state, based on my current state
    this.props.handleUpdateSearchQuery(this.props.redditQuery.name, this.state.searchQuery);
  };

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <input type="text"
                 name="searchQuery"
                 value={this.state.searchQuery}
                 onChange={this.handleChange}
          />
          <br/>
          <button
              className="searchRedditButton"
              type="submit"
              value="Submit">Search Reddit
          </button>
        </form>
    );
  }
}

RedditSearch.propTypes = {
  redditQuery: PropTypes.object,
};

export default RedditSearch;
