import React from 'react';
import PropTypes from 'prop-types';

import superagent from 'superagent';

// !: = development notes

class RedditCard extends React.Component {
  // no constructor needed -- yet
  render() {
    // !: this.props is coming from the parent component
    //      and here, we assume it has a searchFeed property
    const { searchFeed } = this.props;

    function findPictures(picture) {
      const ext = '.jpg';
      const testUrl = new RegExp(ext+"$").test(picture);
      if (testUrl) {
        return testUrl; // aka ' true '
      } // else
      return testUrl; // aka ' false '
    }

    function findVideos(video) {
      const ext = 'v.redd.it';
      const testUrl = video.includes(ext);
      if (testUrl) {
        return testUrl; // aka ' true '
      } // else
      return testUrl; // aka ' false '
    }

    return (
      <li onClick={this.handleClick}>
        <br />
        <p>Author: {searchFeed.data.author}</p>
        {findPictures(searchFeed.data.url) === true ? <img className="searchImages" src={searchFeed.data.url} /> : <p>No image to display</p>}
        {findVideos(searchFeed.data.url) === true ?
            <video className="searchVideos" controls>
              <source src={searchFeed.data.secure_media.reddit_video.fallback_url} type="video/mp4" />
                <source src={searchFeed.data.secure_media.reddit_video.fallback_url} type="video/ogg" />
                  Your browser does not support HTML5 video.
            </video>
          : undefined}
        <br />
        <a className="imageLinks" href={`https://reddit.com/${searchFeed.data.permalink}`} target="_blank">{searchFeed.data.title}</a>
        <p>Ups: {searchFeed.data.ups}</p>
        {/*
        {searchFeed.data.is_video ? <p>This post has a <text className="blue">video</text></p>
        : undefined
        */}
      </li>
    );
  }
}

RedditCard.propTypes = {
  searchFeed: PropTypes.object,
  handlePokemonUpdate: PropTypes.func,
  handleNameChange: PropTypes.func,
};

export default RedditCard;
