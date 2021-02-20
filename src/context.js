import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  QUERY_USER,
  QUERY_USERS,
  REMOVE_USER,
  DEFAULT_PAGE,
  ERROR,
} from "./actions";

import reducer from "./reducer";

const initialState = {
  isLoading: true,
  querySingleUser: false,
  singleUser: null,
  users: [],
  deleteUserId: null,
  fetchError: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchUsers = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      dispatch({ type: QUERY_USERS, payload: { data } });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`/api/user/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: REMOVE_USER, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  const searchUserById = async (queryUserId) => {
    dispatch({
      type: SET_LOADING,
    });
    const response = await fetch(`/api/user/${queryUserId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Data", data);
    console.log("Response", response);
    if (response.ok) {
      dispatch({
        type: QUERY_USER,
        payload: {
          data,
        },
      });
    } else {
      dispatch({
        type: ERROR,
      });
    }
  };

  const returnToAllUsers = async () => {
    dispatch({ type: DEFAULT_PAGE });
  };

  const registerNewUser = async (user) => {
    dispatch({
      type: SET_LOADING,
    });
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    const data = await response.json();
    console.log("Data", data);
    console.log("Response", response);
    if (response.ok) {
      dispatch({
        type: QUERY_USER,
        payload: {
          data,
        },
      });
    } else {
      dispatch({
        type: ERROR,
      });
    }
  };

  useEffect(() => {
    fetchUsers(`/api/users`);
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        deleteUser,
        searchUserById,
        fetchUsers,
        returnToAllUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
