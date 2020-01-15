import { combineReducers } from 'redux';

import streamElements from './streamElements/reducer';
import notifications from './notifications/reducer';

export default combineReducers({
  streamElements,
  notifications
});
