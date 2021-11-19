import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import InitialPage from './Components/InitialPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" render={ () => <InitialPage /> } />
    </BrowserRouter>
  );
}
