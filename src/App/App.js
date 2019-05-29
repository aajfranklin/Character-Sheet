import React from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Ki from './pages/Ki/Ki';
import Error from './components/Error/Error';
import './App.css';

export function App({pages, showError}) {
    return (
        <div className='App'>
            <Router>
                <nav>
                    {pages.map((page) => {
                        return (<NavLink exact={true} className='nav-item' activeClassName='nav-active' key={page} to={'/' + page}>{page}</NavLink>);
                    })}
                </nav>
                <main>
                    {showError ? <Error/> : null}
                    <Route exact path='/Ki' component={Ki} />
                </main>
            </Router>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        pages: state.app.pages,
        showError: state.app.showError
    }
}

export default connect(mapStateToProps)(App);
