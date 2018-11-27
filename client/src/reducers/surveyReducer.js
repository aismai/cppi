import {
  GET_SURVEYS,
  CREATE_SURVEY,
  DELETE_SURVEYS,
  GET_SURVEY,
  UPDATE_SURVEY
} from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SURVEYS:
      return {
        ...state,
        surveyList: action.payload
      };

    case CREATE_SURVEY:
      return {
        ...state,
        surveyList: [...state.surveyList, action.payload]
      };

    case GET_SURVEY:
      return {
        ...state,
        survey: action.payload
      };

    case UPDATE_SURVEY:
      return {
        ...state,
        survey: {
          ...action.payload,
          questions: Object.assign([...action.payload.questions])
        }
      };
    case DELETE_SURVEYS:
      return {
        ...state,
        surveyList: state.surveyList.filter(
          survey => !action.payload.includes(survey._id)
        )
      };

    default:
      return state;
  }
};
