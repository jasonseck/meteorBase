const loginReducer = (state = {}, { type, ...rest }) => {
  console.log('login reducer firing');
  switch (type) {
    case 'ON_LOGIN':
      return { ...state, ...rest };
    case 'ON_LOGOUT':
      return { ...state, ...rest };
    default:
      return state;
  }
};
export default loginReducer;
