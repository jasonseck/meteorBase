const filterReducer = (state = {filter:''}, action, data) => {
  console.log('filter reducer firing');
  switch(action.type) {
    case 'CHANGE_FILTER':
      return {
        ...state,
        filter: action.data

      }
    case 'CLEAR_FILTER':
      return {
        ...state,
        filter:''
      }
      default:
        return state;
  }
}

export default filterReducer;
