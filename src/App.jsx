import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap'
import Profile from './Profile';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    };
  }

  search() {
    const ACCESS_TOKEN = 'BQBa1BfIYsU-wMVGxVt-Mk9EKdlcJM0sT60t7PIauNvKiY8jnBqNTzqSoVYMZQyfANU8UxfqXQkC2rJEihqZXhBxCBJyPFSUshnYMdx5jyiRzeij0Pnx8jGi_CXffIi_fjcR3cHHdkEngRNO9nESXbbVz8Sv';
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        Authorization : 'Bearer ' + ACCESS_TOKEN
      },
      mode: 'cors',
      cache: 'default'
    })
    .then(response => response.json())
    .then(json => {
      if(json.artists && json.artists.items && json.artists.items.length > 0) {
        console.log('RESPONSE', json.artists.items[0]);
        this.setState({artist: json.artists.items[0]});
      }
    });
  }

  render() {
    return(
      <div className='App'>
        <div className='App-title'>Music Master!!</div>
        <FormGroup>
        <InputGroup>
          <FormControl 
          type="text" 
          placeholder="Search For an Artist"
          value={this.state.query}
          onChange={event => this.setState({query: event.target.value})}
          onKeyPress={event => {
            if(event.key === 'Enter') {
              this.search();
            }
          }}
          />
          <InputGroup.Addon onClick={() => this.search()}>
            <Glyphicon glyph="search"></Glyphicon>
          </InputGroup.Addon>
        </InputGroup>
        </FormGroup>
        <Profile artist={this.state.artist}/>
        <div className='Gallery'>
          Gallery
        </div>
      </div>
    );
  }
}

export default App;