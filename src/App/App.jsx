import React from 'react';
import {
  BrowserRouter as Router, NavLink, Route, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { loadStats } from './actions/actionCreators';
import Stats from './pages/Stats/Stats';
import Inventory from './pages/Inventory/Inventory';
import Weapons from './pages/Weapons/Weapons';
import Ki from './pages/Ki/Ki';
import Features from './pages/Features/Features';
import Lore from './pages/Lore/Lore';
import Map from './pages/Map/Map';
import NotFound from './pages/NotFound/NotFound';
import Error from './components/Error/Error';
import './App.css';

export function App({
  loadOnStart, pages, showError, stats,
}) {
  if (isEmpty(stats)) {
    loadOnStart();
  }

  return (
    <div className="App">
      <Router>
        <nav>
          {pages.map(page => (<NavLink exact className="nav-item" activeClassName="nav-active" key={page} to={`/${page}`}>{page}</NavLink>))}
        </nav>
        <main>
          {showError ? <Error /> : null}
          <Switch>
            <Route exact path="/Stats" component={Stats} />
            <Route exact path="/Inventory" component={Inventory} />
            <Route exact path="/Weapons" component={Weapons} />
            <Route exact path="/Ki" component={Ki} />
            <Route exact path="/Features" component={Features} />
            <Route exact path="/Lore" component={Lore} />
            <Route exact path="/Map" component={Map} />
            <Route exact component={NotFound} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

App.propTypes = {
  loadOnStart: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.string).isRequired,
  showError: PropTypes.bool.isRequired,
  stats: PropTypes.objectOf(PropTypes.number).isRequired,
};

function mapStateToProps(state) {
  return {
    pages: state.app.pages,
    showError: state.app.showError,
    stats: state.app.stats,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadOnStart: () => dispatch(loadStats()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
