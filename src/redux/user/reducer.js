
// Set initial state
const initialState = {
  usersData: {},
  addUsersRef: {},
  editUsersRef: {},
  getUsersByIdData: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'getUsersRef': {
      const data = action.data;
      return {
        ...state,
        usersData: data,
      };
    }
    case 'getUsersByIDRef': {
      const data = action.data;
      return {
        ...state,
        getUsersByIdData: data,
      };
    }
    case 'addUsersRef': {
      const data = action.data;
      return {
        ...state,
        addUsersRef: data,
      };
    }
    case 'editUsersRef': {
      const data = action.data;
      return {
        ...state,
        editUsersRef: data,
      };
    }
    case 'resetUsersRef': {
      return {
        ...state,
        usersData: {},
        addUsersRef: {},
        editUsersRef: {},
        getUsersByIdData: {}
      };
    }
    default:
      return state;
  }
}
