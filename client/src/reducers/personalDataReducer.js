import {
  GET_ALL_PERSONAL_DATA,
  CREATE_PERSONAL_DATA,
  GET_PERSONAL_DATUM,
  UPDATE_PERSONAL_DATA,
  DELETE_PERSONAL_DATA
} from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PERSONAL_DATA:
      return {
        ...state,
        data: action.payload
      };

    case CREATE_PERSONAL_DATA:
      return {
        ...state,
        data: [...state.data, action.payload]
      };

    case UPDATE_PERSONAL_DATA:
      return {
        ...state,
        datum: {
          ...action.payload
        }
      };

    case GET_PERSONAL_DATUM:
      return {
        ...state,
        datum: action.payload
      };

    case DELETE_PERSONAL_DATA:
      return {
        ...state,
        data: state.data.filter(datum => !action.payload.includes(datum._id))
      };

    default:
      return state;
  }
};
