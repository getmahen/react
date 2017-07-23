import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap'
import './App.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    //console.log('Profile component Props:', this.props);
    let artist = {name : '', followers : {total : ''}};
    if(this.props.artist !== null) {
      artist = this.props.artist;
    }
    return (
      <div>
        <div>Profile Name: {artist.name}</div>
        <div>Profile Followers: {artist.followers.total}</div>
      </div>

    );
  }
}

export default Profile;