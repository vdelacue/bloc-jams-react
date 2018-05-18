import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
    constructor(props) {
        super(props);
        
        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug;
        });
        
        this.state = {
            album: album,
            currentSong: album.songs[0],
            isPlaying: false
        };
        
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }
    
    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }
        
    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
    }
    
    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }
    
    handleSongClick(song) {
        const isSameSong = (this.state.currentSong === song) ;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if(!isSameSong) { this.setSong(song); }
            this.play();
        }
    }
    
    onMouseEnter() {
        this.album.number = document.getElementById("test");
    }
    
    render() {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src ={this.state.album.albumCover} alt="album-cover-art" />
                    <div className="album-details">
                        <span id="test" className="ion-play"></span>
                        <span className="ion-pause"></span>
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
                            <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                                <td className="song-number" onMouseEnter="mouseEnter()" onMouseLeave="mouseLeave()">{song.number}</td> 
                                    <span className="ion-play"></span>
                                    <span className="ion-pause"></span>
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