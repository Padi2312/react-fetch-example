import React from 'react'
import './App.css';
import Home from './../Home/Home';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import GetExample from './../Get/GetExample';
import PostExample from './../Post/PostExample';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/getsample" component={GetExample} />
          <Route exact path="/postsample" component={PostExample} />

          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
