import {
  GET_QUESTIONS,
  CREATE_QUESTION,
  DELETE_QUESTIONS,
  GET_QUESTION,
  UPDATE_QUESTION
} from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questionList: action.payload
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload
      };
    case CREATE_QUESTION:
      return {
        ...state,
        questionList: [...state.questionList, action.payload]
      };

    case UPDATE_QUESTION:
      return {
        ...state,
        question: {
          ...action.payload,
          answers: Object.assign([...action.payload.answers])
        }
      };

    case DELETE_QUESTIONS:
      return {
        ...state,
        questionList: state.questionList.filter(
          question => !action.payload.includes(question._id)
        )
      };
    default:
      return state;
  }
};
