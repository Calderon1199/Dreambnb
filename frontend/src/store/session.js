import { csrfFetch } from './csrf';

// Action Types
const SET_USER = 'session/SET_SESSION_USER';
const REMOVE_USER = 'session/REMOVE_SESSION_USER';

// Initial State
const initialState = {
  user: null
};

// Action Creators
const setSessionUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeSessionUser = () => ({
  type: REMOVE_USER
});

// Reducer
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};


// Thunk Action
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
  const response = await csrfFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setSessionUser(user));
    return response;
  }
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/current_user");
    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/login', {
      method: 'DELETE',
    });
    dispatch(removeSessionUser());
    return response;
  };

// Default Export
export default sessionReducer;
