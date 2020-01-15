export default function notifications(state = { show: false }, action) {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
}
