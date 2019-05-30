import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { loadStats } from './actions/actionCreators';
import Stats from './pages/Stats/Stats';
import Weapons from './pages/Weapons/Weapons';
import Ki from './pages/Ki/Ki';
import Abilities from './pages/Abilities/Abilities';
import Lore from './pages/Lore/Lore';
import Map from './pages/Map/Map';
import NotFound from './pages/NotFound/NotFound'
import Error from './components/Error/Error';
import './App.css';

export function App({loadStats, pages, showError, stats}) {

    if (isEmpty(stats)) {
        loadStats();
    }

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
                    <Switch>
                        <Route exact path='/Stats' component={Stats}/>
                        <Route exact path='/Weapons' component={Weapons}/>
                        <Route exact path='/Ki' component={Ki}/>
                        <Route exact path='/Abilities' component={Abilities}/>
                        <Route exact path='/Lore' component={Lore}/>
                        <Route exact path='/Map' component={Map}/>
                        <Route exact component={NotFound}/>
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        pages: state.app.pages,
        showError: state.app.showError,
        stats: state.app.stats
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadStats: () => dispatch(loadStats())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
