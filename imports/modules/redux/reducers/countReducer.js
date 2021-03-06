const countReducer = (state = {limit:75,skip:0}, action) => {
  console.log('skip reducer firing');
  switch(action.type) {
    case 'INCREASE_SKIP':
      return {
        ...state,
        skip: state.skip + 1,
      }
    case 'DECREASE_SKIP':
      return {
        ...state,
        skip: state.skip - 1,
      }
    case 'CHANGE_FILTER':
      return {
        ...state,
        skip:0
      }
    case 'CLEAR_FILTER':
      return {
        ...state,
        skip:0
      }
      default:
        return state;
  }
}

export default countReducer;
