import axios from "axios";
import {
  GET_ALL_PERSONAL_DATA,
  CREATE_PERSONAL_DATA,
  UPDATE_PERSONAL_DATA,
  GET_PERSONAL_DATUM,
  DELETE_PERSONAL_DATA,
  GET_ERRORS
} from "./types";

export const getPersonalData = () => dispatch => {
  axios
    .get("/api/personal-data")
    .then(res =>
      dispatch({
        type: GET_ALL_PERSONAL_DATA,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_PERSONAL_DATA,
        payload: null
      })
    );
};

export const createPersonalData = newPersonalData => dispatch => {
  axios
    .post("/api/personal-data", newPersonalData)
    .then(res =>
      dispatch({
        type: CREATE_PERSONAL_DATA,
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

export const getPersonalDatum = datumId => dispatch => {
  axios
    .get(`/api/personal-data/${datumId}`)
    .then(res =>
      dispatch({
        type: GET_PERSONAL_DATUM,
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

export const updatePersonalDatum = updatedDatum => dispatch => {
  axios
    .put(`/api/personal-data/${updatedDatum._id}`, updatedDatum)
    .then(res =>
      dispatch({
        type: UPDATE_PERSONAL_DATA,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const deletePersonalData = dataIds => dispatch => {
  axios
    .post("/api/personal-data/delete", { dataIds })
    .then(res => dispatch({ type: DELETE_PERSONAL_DATA, payload: dataIds }));
};
