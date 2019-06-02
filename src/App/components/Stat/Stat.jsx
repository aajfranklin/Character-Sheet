import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  cacheStat, revertStat, pushError, updateStat, updateStatSuccess,
} from '../../actions/actionCreators';
import { INVALID_STAT } from '../Error/ErrorTypes';
import './Stat.css';

export function Stat({
  beingEdited, cache, cachedValue, revertWithError,
  revertWithoutError, stat, stats, update, updateStatLocally,
}) {
  const handleBlur = (e) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value)) || value === '') {
      revertWithError();
    } else if (parseInt(value, 10) === cachedValue) {
      revertWithoutError();
    } else {
      update(stat, parseInt(value, 10));
    }
  };

  const handleSpanKeyDown = (e) => {
    if (e.key === 'Enter') cache();
  };

  const handleTextAreaKeyDown = (e) => {
    if (e.key === 'Enter') document.activeElement.blur();
  };

  return (
    stat === beingEdited
      // eslint-disable-next-line jsx-a11y/no-autofocus
      ? <textarea autoFocus className="stat" value={stats[stat].toString().trim()} onChange={updateStatLocally} onBlur={handleBlur} onKeyDown={handleTextAreaKeyDown} />
      : <span role="textbox" tabIndex="0" className="stat" onClick={cache} onKeyDown={handleSpanKeyDown}>{stats[stat]}</span>
  );
}

Stat.propTypes = {
  beingEdited: PropTypes.string,
  cache: PropTypes.func.isRequired,
  cachedValue: PropTypes.number,
  revertWithError: PropTypes.func.isRequired,
  revertWithoutError: PropTypes.func.isRequired,
  stat: PropTypes.string.isRequired,
  stats: PropTypes.objectOf(PropTypes.number).isRequired,
  update: PropTypes.func.isRequired,
  updateStatLocally: PropTypes.func.isRequired,
};

Stat.defaultProps = {
  beingEdited: undefined,
  cachedValue: undefined,
};

function mapStateToProps(state) {
  return {
    stats: state.app.stats,
    beingEdited: state.app.statCache.stat,
    cachedValue: state.app.statCache.value,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    revertWithError: () => {
      dispatch(revertStat(ownProps.stat));
      dispatch(pushError(INVALID_STAT));
    },
    revertWithoutError: () => {
      dispatch(revertStat(ownProps.stat));
    },
    update: (stat, value) => {
      dispatch(updateStat(stat, value));
      dispatch(cacheStat(''));
    },
    updateStatLocally: (e) => {
      dispatch(updateStatSuccess(ownProps.stat, e.target.value));
    },
    cache: () => {
      dispatch(cacheStat(ownProps.stat));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stat);
