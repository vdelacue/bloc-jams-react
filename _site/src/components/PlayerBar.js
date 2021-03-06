import React, { Component } from 'react';
import '../css/playerBar.css';


class PlayerBar extends Component {
    render() {
        return (
            <section className="player-bar">
               
            <section id="time-control">
                    <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
                    <input 
                        type="range" 
                        className="seek-bar" 
                        value={(this.props.currentTime / this.props.duration) || 0}
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleTimeChange}
                    />
                    <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
                </section>

                <section id="buttons">
                    <button className="btn btn-dark" id="previous" onClick={this.props.handlePrevClick}>
                        <span className="ion-skip-backward"></span>
                    </button>
                    <button className={this.props.isPlaying ? 'btn btn-danger' : 'btn btn-success'} id="play-pause" onClick={this.props.handleSongClick}>
                        <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
                    </button>
                    <button className="btn btn-dark" id="next" onClick={this.props.handleNextClick}>
                        <span className="ion-skip-forward"></span>
                    </button>      
                </section>
                
                <section id="volume-control">
                    <div className="icon ion-volume-low"></div>
                    <input 
                        type="range" 
                        className="seek-bar" 
                        value={(this.props.currentVolume)} 
                        max="100"
                        min="0"
                        step="1"
                        onChange={this.props.handleVolumeChange}
                    />
                    <div className="icon ion-volume-high">{this.props.currentVolume}</div>
                </section>
            </section>
        
        );
    }
    
}

export default PlayerBar;