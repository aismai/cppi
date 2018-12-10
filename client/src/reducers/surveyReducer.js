import {
  GET_SURVEYS,
  CREATE_SURVEY,
  DELETE_SURVEYS,
  GET_SURVEY,
  UPDATE_SURVEY,
  FIND_SURVEY_BY_DATA_ID,
  FILL_IN_SURVEY,
  UPDATE_FILLED_SURVEY_FORM,
  GET_FILLED_SURVEYS,
  GET_STATS,
  GET_STATS_QUESTIONS
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

    case FIND_SURVEY_BY_DATA_ID:
      return {
        ...state,
        filledSurveys: action.payload
      };

    case FILL_IN_SURVEY:
      return {
        ...state,
        filledSurveys: [...state.filledSurveys, action.payload]
      };

    case UPDATE_FILLED_SURVEY_FORM:
      return {
        ...state,
        filledSurveys: state.filledSurveys
          .filter(survey => survey._id !== action.payload._id)
          .concat([action.payload])
      };

    case GET_FILLED_SURVEYS:
      return {
        ...state,
        filledSurveys: action.payload
      };

    case GET_STATS:
      return {
        ...state,
        stats: action.payload
      };

    case GET_STATS_QUESTIONS:
      return {
        ...state,
        statsQuestions: action.payload
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
