import axios from "axios";
import {
  GET_SURVEYS,
  CREATE_SURVEY,
  DELETE_SURVEYS,
  GET_ERRORS,
  GET_SURVEY,
  UPDATE_SURVEY,
  FILL_IN_SURVEY,
  UPDATE_FILLED_SURVEY_FORM,
  GET_FILLED_SURVEYS,
  GET_STATS
} from "./types";

export const getSurveyList = () => dispatch => {
  axios
    .get("/api/survey-prototypes")
    .then(res =>
      dispatch({
        type: GET_SURVEYS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SURVEYS,
        payload: null
      })
    );
};

export const createSurvey = newSurvey => dispatch => {
  axios
    .post("/api/survey-prototypes", newSurvey)
    .then(res =>
      dispatch({
        type: CREATE_SURVEY,
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

export const getSurvey = surveyId => dispatch => {
  axios
    .get(`/api/survey-prototypes/${surveyId}`)
    .then(res =>
      dispatch({
        type: GET_SURVEY,
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

export const updateSurvey = survey => dispatch => {
  axios
    .put(`/api/survey-prototypes/${survey._id}`, survey)
    .then(res =>
      dispatch({
        type: UPDATE_SURVEY,
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

export const deleteSurveys = surveyIds => dispatch => {
  axios.post("/api/survey-prototypes/delete", { surveyIds }).then(res =>
    dispatch({
      type: DELETE_SURVEYS,
      payload: surveyIds
    })
  );
};

export const fillSurveyForm = survey => dispatch => {
  axios
    .post("/api/surveys", survey)
    .then(res => {
      return dispatch({
        type: FILL_IN_SURVEY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const updateFilledSurveyForm = updatedSurvey => dispatch => {
  axios
    .put(`/api/surveys/update`, updatedSurvey)
    .then(res =>
      dispatch({
        type: UPDATE_FILLED_SURVEY_FORM,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getFilledSurveys = () => dispatch => {
  axios
    .get("/api/surveys")
    .then(res =>
      dispatch({
        type: GET_FILLED_SURVEYS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FILLED_SURVEYS,
        payload: null
      })
    );
};

export const getSurveyStats = () => dispatch => {
  axios
    .get("/api/stats")
    .then(res =>
      dispatch({
        type: GET_STATS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STATS,
        payload: null
      })
    );
};
