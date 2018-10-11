import { GET_USERS, DELETE_USERS } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        userList: action.payload
      };
    case DELETE_USERS:
      return {
        ...state,
        userList: state.userList.filter(
          user => !action.payload.includes(user._id)
        )
      };
    default:
      return state;
  }
};
