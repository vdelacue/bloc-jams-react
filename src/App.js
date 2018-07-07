import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="container-fluid">
            <div className="jumbotron-fluid clearfix">
                <nav>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <Link to='/' className="navLanding btn btn-outline-dark">Landing</Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <Link to='/Library' className="navLibrary btn btn-outline-dark">Library</Link>
                            </a>
                        </li>
                    </ul> 
                </nav>
            </div>
            <div className="clearfix">
                <h1 id="blocJams" className="clearfix">Bloc Jams</h1>
            </div>
        </header>
        <main className="container-fluid">
            <Route exact path="/" component={Landing} />
            <Route path="/library" component={Library} />
            <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
