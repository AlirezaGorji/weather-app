export const tempTypeReducer = (state = true, action) => {
  switch (action.type) {
    case 'FAHRENHEIT':
      return false;
      break;
    case 'CELSIUS':
      return true;
      break;
    default:
      return state;
      break;
  }
}
