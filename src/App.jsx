import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap'
import Profile from './Profile';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: [],
      hasSearchError: false,
      errorMessage: ''
    };
  }

  makeFetch(URL, method, options){
    const ACCESS_TOKEN = 'BQDXrvMdtrmm1ssEM_UUhz-3tr87MpFUC5hG54iDTFFZcnz2JfEKMzowRdjV65SBYLAgpQU4Fqgc5ZQ3qishVSHX3ee1W9736hq6A7_7RlwymUnm2d3-WyZTiSenfiJwOANH0UaZlzCNNcGuQwBqX3wwtGql';
    
    if(!options) {
      options = {
        method: method,
        headers: {
          Authorization : 'Bearer ' + ACCESS_TOKEN
        },
        mode: 'cors',
        cache: 'default'
      }
    }
    return fetch(URL, options);
  };

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search';
    let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists';

    this.makeFetch(FETCH_URL, 'GET')
    .then(response => response.json())
    .then(json => {
      let artist = null;
      if(json.artists && json.artists.items && json.artists.items.length > 0) {
        artist = json.artists.items[0]
        this.setState({artist: artist});
      } else {
        this.setState({
          hasSearchError : true, 
          errorMessage : "An unexpected Error has occurred!!"
        });
        //console.log('ERROR==', json);
      }
      return artist;
    })
    .then(artist => {
      if(artist) {
        FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US`;
        return this.makeFetch(FETCH_URL, 'GET')
      }
      else {
        throw new Error('Error retrieving Artists top tracks from API');
      }
    })
    .then(albumResponse => {
      console.log('ALBUM RESPONSE', albumResponse);
      return albumResponse.json();
    })
    .then(albumJson => {
      console.log('ALBUM==', albumJson);
      const {tracks} = albumJson;
      if (tracks !== null) {
         this.setState({tracks});
      }
    })
    .catch(err => {
      console.log('ERROR==', err);
    });
  }

  render() {
    return(
      <div className='App'>
        <div className='App-title'>Music Master!!</div>
          <div
          className={(this.state.hasSearchError) ? 'App-error' : 'App-hide'}>
          {this.state.errorMessage}
          </div>
          <div className={(this.state.hasSearchError) ? 'App-hide' : 'App-show'}>
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
            {
              this.state.artist !== null ?
              <div>
                <Profile artist={this.state.artist}/>
                <div className='Gallery'>
                  Gallery
                </div>
              </div>
              : 
              <div></div>
            }
          </div>
      </div>
    );
  }
}

export default App;