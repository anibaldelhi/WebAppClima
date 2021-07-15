import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import HomePage from '../pages/Home';
import ListPage from '../pages/List';
import ErrorPage from '../pages/Error';

export default function App() {
  return (
   <BrowserRouter>
    <Switch>
      <Route path="/list" >
        <ListPage />
      </Route>
      <Route exact path="/" >
        <HomePage />
      </Route>
      <Route path="*">
        <ErrorPage />
      </Route>
    </Switch>
   </BrowserRouter>
  );
}
