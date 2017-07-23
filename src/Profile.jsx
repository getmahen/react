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
    let artist = {
      name : '', 
      images: [{url : ''}], 
      followers : {total : ''},
      genres : []
    };
    artist = (this.props.artist !== null) ? this.props.artist : artist;
    //console.log('ARTIST in PROFILE COMPONENT', artist);
    return (
      <div className="profile">
        <img 
        alt = "Profile"
        className="profile-img"
        src={artist.images[0].url}
        />

        <div className = "profile-info">
          <div className = "profile-name">{artist.name}</div>
          <div className = "profile-followers">
            {artist.followers.total} followers
          </div>
          <div className = "profile-genres">
            {
              artist.genres.map((genre, index) => {
                genre = (genre !== artist.genres[artist.genres.length - 1]) ? 
                        `${genre}, ` : `& ${genre}`;

                return(<span key={index}>{genre}</span>)
              })
            }
          </div>
        </div>
      </div>

    );
  }
}

export default Profile;