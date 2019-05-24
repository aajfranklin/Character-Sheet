import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Ki from './pages/Ki/Ki';
import './App.css';

function App({pages}) {
    return (
        <div className='App'>
            <Router>
                <nav>
                    {pages.map((page) => {
                        return (<Link className='nav-item' key={page} to={'/' + page}>{page}</Link>);
                    })}
                </nav>
                <main>
                    <Route exact path='/Ki' component={Ki} />
                </main>
            </Router>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        pages: state.app.pages
    }
}

export default connect(mapStateToProps)(App);
