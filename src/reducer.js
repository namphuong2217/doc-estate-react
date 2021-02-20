import {
  SET_LOADING,
  QUERY_USER,
  QUERY_USERS,
  REMOVE_USER,
  DEFAULT_PAGE,
  ERROR,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case QUERY_USERS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.data,
        fetchError: false,
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        querySingleUser: false,
        fetchError: false,
      };
    case QUERY_USER:
      return {
        ...state,
        singleUser: action.payload.data,
        querySingleUser: true,
        isLoading: false,
        fetchError: false,
      };
    case DEFAULT_PAGE:
      return { ...state, querySingleUser: false, fetchError: false };
    case ERROR:
      return { ...state, isLoading: false, fetchError: true };
    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};

export default reducer;
