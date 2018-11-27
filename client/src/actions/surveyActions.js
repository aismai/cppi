import axios from "axios";
import {
  GET_SURVEYS,
  CREATE_SURVEY,
  DELETE_SURVEYS,
  GET_ERRORS,
  GET_SURVEY,
  UPDATE_SURVEY
} from "./types";

export const getSurveyList = () => dispatch => {
  axios
    .get("/api/surveys")
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
    .post("/api/surveys", newSurvey)
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
    .get(`/api/surveys/${surveyId}`)
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
    .put(`/api/surveys/${survey._id}`, survey)
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
  axios.post("/api/surveys/delete", { surveyIds }).then(res =>
    dispatch({
      type: DELETE_SURVEYS,
      payload: surveyIds
    })
  );
};
