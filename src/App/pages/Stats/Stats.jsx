import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Stats.css';
import Stat from '../../components/Stat/Stat';

function Stats(stats) {
  return (
    <div>
      <div className="title-area">
        <div className="title-half-left-align">
          <h1>Rosco Weatherbie</h1>
        </div>
        <div className="title-stat-grid">
          <div><b>Class:</b></div><div>Monk</div>
          <div><b>Level:</b></div><div className="stat-container"><Stat stat="monkLevel" value={stats.monkLevel} /></div>
          <div><b>Background:</b></div><div>Hermit</div>
          <div><b>Race:</b></div><div>Stout Halfling</div>
          <div><b>Experience:</b></div><div className="stat-container"><Stat stat="xp" value={stats.xp} /></div>
          <div><b>Alignment:</b></div><div>Neutral Good</div>
        </div>
      </div>
      <div className="content">
        <div className="col-5 one" />
        <div className="col-5 two" />
        <div className="col-5 three" />
      </div>
    </div>
  );
}

Stats.propTypes = {
  stats: PropTypes.objectOf(PropTypes.number).isRequired,
};

function mapStateToProps(state) {
  return {
    stats: state.app.stats,
  };
}

export default connect(mapStateToProps)(Stats);
