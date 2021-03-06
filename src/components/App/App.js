import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Form from '../Form/Form';
import UserProfile from '../UserProfile/UserProfile';
import MovieContainer from '../MovieContainer/MovieContainer';
import CharacterContainer from '../CharacterContainer/CharacterContainer';
import { getMovies } from '../apiCalls/apiCalls'
import { Route, Redirect } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      name: '',
      favoriteQuote: '',
      ranking: '',
      movies: [],
      characterURLs: []
    }
  }

  componentDidMount() {
    getMovies()
    .then(movies => {
      this.setState({
        movies: movies.results
      })
    })
    .catch(error => console.log(error))
  }

  updateStateFromForm = (name, favoriteQuote, ranking) => {
    this.setState({
      loggedIn: true,
      name: name,
      favoriteQuote: favoriteQuote,
      ranking: ranking
    })
  }

  updateStateWithCharacters = (characters) => {
    let characterList = [];
    characters.forEach(character => {
      if (characterList.length < 10) {
        characterList.push(character);
      }
    })
    this.setState({
      characterURLs: characterList
    })
  }

  logOut = () => {
    this.setState({
      loggedIn: false
    })
  }

  render() {
    return (
      <main className="App">
        <Route exact path="/">
          {this.state.loggedIn ? <Redirect to="/movies" /> : (
            <>
              <Header
                heading='HELLO, YOUNG JEDI'
                showHomeButton={false}
                logOut={this.logOut}
              />
              <Form
                updateStateFromForm={this.updateStateFromForm}
              />
            </>
          )}
        </Route>
        <Route exact path='/movies' render={() => {
          return (
            <>
              <UserProfile
                name={this.state.name}
                favoriteQuote={this.state.favoriteQuote}
                ranking={this.state.ranking}
              />
              <Header
                heading='THE MOVIES'
                showHomeButton={true}
                logOut={this.logOut}
              />
              <MovieContainer
                movies={this.state.movies}
                updateStateWithCharacters={this.updateStateWithCharacters}
                />
            </>
          )
        }} />
        <Route path='/movies/:id' render={({ match }) => {
          return (
            <>
              <UserProfile
                name={this.state.name}
                favoriteQuote={this.state.favoriteQuote}
                ranking={this.state.ranking}
              />
              <Header
                heading='THE CHARACTERS'
                showHomeButton={true}
                logOut={this.logOut}
              />
              <CharacterContainer characterURLs={this.state.characterURLs}/>
            </>
          )
        }} />
      </main>
    );
  }
};

export default App;
