import {
  GET_USERS,
  ADD_TO_BOOKMARK_LIST,
  REMOVE_FROM_BOOKMARK_LIST
} from './actions';

const initialState = {
  users: [],
  bookmarks: []
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      if(action.page == 1){
        return { ...state, users: action.payload };  
      }
      return { ...state, users:  state.users.concat(action.payload) };
    case ADD_TO_BOOKMARK_LIST:
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case REMOVE_FROM_BOOKMARK_LIST:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(book => book.id !== action.payload.id)
      };
    default:
      return state;
  }
}

export default usersReducer;
