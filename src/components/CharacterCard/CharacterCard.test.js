import React from 'react';
import ReactDOM from 'react-dom';
import CharacterCard from './CharacterCard';
import { shallow } from 'enzyme';

describe('CharacterCard', () => {
  let character = {
    name: 'Bob',
    homeworld: ['Earth', 7000000000],
    species: 'human',
    films: ['Pulp Fiction', 'Empire Strikes Back', 'Casablanca']
  }
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CharacterCard
      character={character}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})
