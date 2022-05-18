import React, { useState, createContext } from "react";
import { render } from "react-dom";
import axios from 'axios';

export const AppContext = createContext();

const App = () => {

  return (
    <div>
      <h1>Cyclops</h1>
      <h2>Hi guys! Time to start working!</h2>
    </div>
  )
}

render(<App />, document.getElementById("root"));