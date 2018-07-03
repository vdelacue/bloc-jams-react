import React from 'react';

const Landing = () => (
    <section className="container-fluid">
        <h1 className="hero-title">Turn the music up!</h1>
        <section className="selling-points">
            <div className="container">
                <div className="row">
                    <aside className="col-sm-4">
                        <img className="selling-point-img" src="./backgroundimages/chooseMusic.jpg" alt="turntable and headphones" className="img-thumbnail"/>
                        <div className="point">
                            <h2 className="point-title">Choose your music</h2>
                            <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
                        </div>
                    </aside>
                    <section className="col-sm-4">
                        <img src="backgrounds/unlimitedStreaming.jpg" alt="unlimited Streaming" className="img-thumbnail"/>
                        <div className="point">
                            <h2 className="point-title">Unlimited, streaming, ad-free</h2>
                            <p className="point-description">No arbitrary limits. No distractions.</p>
                        </div>
                    </section>
                    <aside className="col-sm-4">
                        <img src="backgroundimages/mobileEnabled.jpg" alt="mobile device recording music" className="img-thumbnail"/>
                        <div className="point">
                            <h2 className="point-title">Mobile enabled</h2>
                            <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms</p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    </section>
);

export default Landing;