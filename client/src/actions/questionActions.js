import axios from "axios";
import {
  GET_QUESTIONS,
  GET_QUESTION,
  DELETE_QUESTIONS,
  CREATE_QUESTION,
  GET_ERRORS,
  UPDATE_QUESTION
} from "./types";

export const getQuestionList = () => dispatch => {
  axios
    .get("/api/questions")
    .then(res =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_QUESTIONS,
        payload: null
      })
    );
};

export const getQuestion = questionId => dispatch => {
  axios.get(`/api/questions/${questionId}`).then(res =>
    dispatch({
      type: GET_QUESTION,
      payload: res.data
    })
  );
};

export const createQuestion = newQuestion => dispatch => {
  axios
    .post("/api/questions", newQuestion)
    .then(res =>
      dispatch({
        type: CREATE_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateQuestion = question => dispatch => {
  axios
    .put(`/api/questions/${question._id}`, question)
    .then(res =>
      dispatch({
        type: UPDATE_QUESTION,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const deleteQuestions = questionsIds => dispatch => {
  axios
    .post("/api/questions/delete", { questionsIds })
    .then(res => dispatch({ type: DELETE_QUESTIONS, payload: questionsIds }));
};
