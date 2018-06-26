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
        <header className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <nav>
                <Link to='/'>Landing</Link>
                <Link to='/Library'>Library</Link>
            </nav>
            <h1 className="clearfix float-left bg-danger">Bloc Jams</h1>
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
