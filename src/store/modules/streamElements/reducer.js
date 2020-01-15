export default function streamElements(state = {}, action) {
  switch (action.type) {
    case 'SET_DATA_STREAM_ELEMENTS':
      return { ...state, ...action.streamElements };
    default:
      return state;
  }
}
