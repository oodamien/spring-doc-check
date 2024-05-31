import React from "react";
import { AppProvider } from "./components/reducer/App";
import "./styles/main.scss";
import Application from "./components/Application";

const App: React.FC<{}> = () => {
  return (
    <AppProvider>
      <Application />
    </AppProvider>
  );
};

export default App;
