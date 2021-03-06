import React, { Component } from 'react';
import './CharacterContainer.css';
import CharacterCard from '../CharacterCard/CharacterCard';
import Loader from '../Loader/Loader';
import { getCharacter, getSpecies, getHomeworld, getFilm } from '../apiCalls/apiCalls';
import PropTypes from 'prop-types';

class CharacterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      characters: []
    }
  }

  componentDidMount() {
    let characters = [];
    this.props.characterURLs.map(character => {
      return getCharacter(character)
      .then(data => {
        let name = data.name;
        let speciesInfo = getSpecies(data.species[0]);
        let homeworldInfo = getHomeworld(data.homeworld);
        let films = data.films.map(film => getFilm(film))

        Promise.all([name, speciesInfo, homeworldInfo, ...films])
          .then(data => {
            characters.push({
              name: data[0],
              species: data[1],
              homeworld: data[2],
              films: data.slice(3)
            })
            if (characters.length > 9) {
              this.setState({
                isLoading: false,
                characters: characters
              })
            }
          })
      })
    })
  }

  renderCards = () => {
    let counter = 0;
    return this.state.characters.map(character => {
      counter++;
      return (
        <CharacterCard
          character={character}
          key={counter}
        />
      )
    })
  }

  render() {
    return (
    <section className='character-container'>
      {
        this.state.isLoading ?
        <Loader /> :
        this.renderCards()
      }
    </section>
    );
  }
}

CharacterContainer.propTypes = {
  characterURLs: PropTypes.array
}

export default CharacterContainer;
