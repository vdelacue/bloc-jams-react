import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
            <div className="jumbotron-fluid clearfix">
                <nav>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <Link to='/' className="navLanding ">Landing</Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <Link to='/Library' className="navLibrary">Library</Link>
                            </a>
                        </li>
                    </ul>
        
        
        
        
        
        
                    
                </nav>
                <h1 className="clearfix float-left bg-danger">Bloc Jams</h1>
            </div>
        </header>
        <main>
            <Route exact path="/" component={Landing} />
            <Route path="/library" component={Library} />
            <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
