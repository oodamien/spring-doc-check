import React, { Dispatch, useReducer } from "react";

export interface IApp {
  complete: boolean;
  loading: boolean;
}

const defaultAppContext = {
  complete: false,
  loading: false,
};

const reducer = (state: IApp, action: any) => {
  switch (action.type) {
    case "UPDATE": {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

const AppContext = React.createContext<{
  state: IApp;
  dispatch: Dispatch<any>;
}>({ state: defaultAppContext, dispatch: () => null });

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultAppContext);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
