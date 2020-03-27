export const getCurrentStore = (state, ownProps) => state.reducer.stores.find(e => e.client_id === ownProps.route.item);

export const getAllPositions = state => state.positions;
// state.positions.filter(point => point.data);

export const getAllWarnings = state => state.warnings;
export const getDetail = state => state.detail;
export const getAllTracks = state =>
  Array.isArray(state.infections) ? state.infections : [];
export const countTracks = state => state.infections.length;

export const countPositions = state => state.positions.length;
export const countWarnings = state => state.warnings.length;
export const getCase = state => state.caseRed;

// TODO: Clean up
export const getWarning = state => {
  console.log("state", state.warnings, state.detail.position);
  if (state.detail.position === undefined) return null;
  return state.warnings.find(e => {
    return (
      e.position.lat === state.detail.position.lat &&
      e.position.lng === state.detail.position.lng
    );
  });
};

export const filteredWarnings = state => state.warnings.filter(e => e.matches && e.matches.length >= 1);
export const getAllFilteredWarnings = (state) => filteredWarnings(state);
export const countFilteredWarnings = state => filteredWarnings(state).length;
