import React, { Component } from 'react';
import albumData from './../data/albums';
import '../Album.css';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
        super(props);
        
        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug;
        });
        
        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            duration: album.songs[0].duration,
            isPlaying: false,
            isPaused: false,
        };
        
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }
    
    componentDidMount() {
        this.eventListeners = {
            timeupdate: (e) => {
                this.setState({ currentTime: this.audioElement.currentTime }); 
            },
            durtionchange: (e) => {
                this.setState({ duration: this.audioElement.duration});
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }
    
    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
        this.setState({ isPaused: false });
    }
        
    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
        this.setState({ isPaused: true });
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
    
    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }
    
    songRowClass(song) {
        const isSameSong = (this.state.currentSong === song) ;
        if (this.state.isPlaying && isSameSong) {
            return "playClass";
        } else if (this.state.isPaused && isSameSong) {
            return "pauseClass";
        } else {
            return "numberOfSongClass";
        }
            
    };
    
    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }
    
    handleNextClick(){
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);        
        const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
        console.log(newIndex);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }
   
    
    render() {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src ={this.state.album.albumCover} alt="album-cover-art" />
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
                            <tr className={this.songRowClass(song)} key={index} onClick={() => this.handleSongClick(song)} >
                                
                                <td className="song-number" >
                                    <span className="ion-play"></span>
                                    <span className="ion-pause"></span> 
                                    <span className="number-icon">{index + 1}</span>
                                </td>    
                                <td className="song-title">{song.title}</td>
                                <td className="song-duration">{song.duration}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <PlayerBar 
                    isPlaying={this.state.isPlaying} 
                    currentSong={this.state.currentSong}
                    currentTime={this.audioElement.currentTime}
                    duration={this.audioElement.duration}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                />
            </section>
        );
    }
}

export default Album;