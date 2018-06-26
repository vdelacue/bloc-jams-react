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
            currentVolume: 80,
            duration: album.songs[0].duration,
            isPlaying: false,
            isPaused: false,
        };
        
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
        this.audioElement.volume = .2;
    }
    
    componentDidMount() {
        this.eventListeners = {
            timeupdate: (e) => {
                this.setState({ currentTime: this.audioElement.currentTime }); 
            },
            durtionchange: (e) => {
                this.setState({ duration: this.audioElement.duration});
            },
            volumeupdate: (v) => {
                this.setState({ currentVolume: this.state.currentVolume});
            },
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
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
    
    handleVolumeChange(v) {
        const newVolume = parseInt(v.target.value);
        this.audioElement.volume = newVolume / 100;
        this.setState({ currentVolume: newVolume });
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
    
    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);        
        const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
        console.log(newIndex);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }
    
    formatTime(timeInSeconds) {
        if (isNaN(timeInSeconds)) {
            return "-:--";
        } else {
            var wholeSecs = parseFloat(timeInSeconds);
            var wholeMins = parseFloat(wholeSecs / 60);
            wholeMins = Math.floor(wholeMins);
            var remainderSecs = (wholeSecs % 60);
            remainderSecs = Math.floor(remainderSecs);
                if(remainderSecs < 10) {
                remainderSecs = "0" + remainderSecs
                };
            var returnTime = wholeMins + ':' + remainderSecs;
            return returnTime;
        }
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
                                <td className="song-duration">{this.formatTime(song.duration)}</td>
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
                    currentVolume={this.state.currentVolume}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                    handleVolumeChange={(v) => this.handleVolumeChange(v)}
                    formatTime={(timeInSeconds) => this.formatTime(timeInSeconds)}
                />
            </section>
        );
    }
}

export default Album;