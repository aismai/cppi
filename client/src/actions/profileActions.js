import axios from "axios";
import { GET_USERS, DELETE_USERS } from "./types";

export const getAllUsers = () => dispatch => {
  axios
    .get("/api/users/all")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};

export const deleteUsers = userIds => dispatch => {
  console.log("ACTION", userIds);
  axios.post("/api/users/delete", { userIds }).then(res =>
    dispatch({
      type: DELETE_USERS,
      payload: userIds
    })
  );
};
