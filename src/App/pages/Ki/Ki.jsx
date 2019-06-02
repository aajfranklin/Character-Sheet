import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { loadAbilities, toggleAddAbilityForm } from './actions/actionCreators';
import { updateStat } from '../../actions/actionCreators';
import Ability from './components/Ability';
import AbilityForm from './components/AbilityForm';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import Stat from '../../components/Stat/Stat';
import './Ki.css';
import '../../components/Button/Button.css';

export function Ki({
  abilities, available, load, showAbilityForm, toggleForm, total, update,
}) {
  useEffect(() => {
    console.log('use effect');
    if (!abilities) load();
  }, [abilities, load]);

  function handleMeditate() {
    update('kiAvailable', total);
  }
  return !abilities ? <Loading /> : (
    <div>
      <div className="title-area">
        <div className="title-half-left">
          <h1>Ki</h1>
          <span className="stat-container">
            {available}
            {' '}
            of
            {' '}
            <Stat stat="kiTotal" value={total} />
            {' '}
            points available
          </span>
        </div>
        <div className="title-half-right">
          <Button clickHandler={handleMeditate} label="MEDITATE" icon="fas fa-praying-hands" />
          <Button clickHandler={toggleForm} label="ADD ABILITY" icon="fas fa-plus-circle" disabled={showAbilityForm} />
        </div>
      </div>
      <CSSTransition in={showAbilityForm} mountOnEnter unmountOnExit classNames="slide-down" timeout={200}>
        <AbilityForm />
      </CSSTransition>
      <table rules="none">
        <tbody>
          <tr className="labels">
            <th className="col-2">Name</th>
            <th className="col-1">Cost</th>
            <th className="col-1">Damage</th>
            <th className="col-1">Boost</th>
            <th className="col-2">Attack/Saving</th>
            <th className="col-6">Effect</th>
          </tr>
          {
            abilities.map((ability, index) => (
              <Ability
                key={ability.uuid}
                index={index}
                uuid={ability.uuid}
                available={available}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

Ki.propTypes = {
  abilities: PropTypes.arrayOf(PropTypes.object),
  available: PropTypes.number,
  load: PropTypes.func.isRequired,
  showAbilityForm: PropTypes.bool.isRequired,
  toggleForm: PropTypes.func.isRequired,
  total: PropTypes.number,
  update: PropTypes.func.isRequired,
};

Ki.defaultProps = {
  abilities: null,
  available: null,
  total: null,
};

function mapStateToProps(state) {
  return {
    abilities: state.ki.abilities,
    available: state.app.stats.kiAvailable,
    showAbilityForm: state.ki.showAbilityForm,
    total: state.app.stats.kiTotal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(loadAbilities()),
    toggleForm: () => dispatch(toggleAddAbilityForm()),
    update: (stat, value) => dispatch(updateStat(stat, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ki);
