import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = { albums: albumData };
    }
    
    render() {
        return (
            <section className='library'>
                {
                    this.state.albums.map( (album, index) =>
                        
                        <Link to={`/album/${album.slug}`} key={index}>
                            <img src={album.albumCover} alt={album.title} className="img-fluid rounded mx-auto d-block" />
                            <ul className="albumData list-group">
                                <li className="list-group-item">{album.title}</li>
                                <li className="list-group-item">{album.artist}</li>
                                <li className="list-group-item">{album.songs.length} songs</li>
                            </ul>
                        </Link>
                    )
                }
            </section>
        );
    }
}

export default Library;