import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Album extends Component {
    constructor(props) {
        super(props);
        
        const matched_album = albumData.find( album => {
            return album.slug === this.props.match.params.slug;
        });
        
        this.state = {
            album: matched_album 
        };
    }
    
    render() {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src ={this.state.album.albumCover} />
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseinfo}</div>
                    </div>
                </section>
            <table id="song-list">
                <colgroup>
                    <col id="song-number-columnn" />
                    <col id="song-title-column" />
                    <col id="song-duration-column" />
                </colgroup>
                <tbody className="song-list">
                    {
                        this.state.album.songs.map( (song, index) =>
                            <tr className="album-view-song-list">
                                <td className="song-number">{song.number}</td>       
                                <td className="song-title">{song.title}</td>
                                <td className="song-duration">{song.duration}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </section>
        );
    }
}

export default Album;