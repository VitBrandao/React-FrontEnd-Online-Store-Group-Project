import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './Components/Content';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

export default App;
