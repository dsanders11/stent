import toCamelCase from './toCamelCase';

export default function registerMethods(machine, transitions, dispatch) {
  for(var state in transitions) {

    (function (state) {
      machine[toCamelCase('is ' + state)] = function() {
        return machine.state.name === state;
      }
    })(state);

    for(var action in transitions[state]) {
      (function(action) {
        machine[toCamelCase(action)] = (...payload) => dispatch(action, ...payload);
      })(action);
    }

  }
}