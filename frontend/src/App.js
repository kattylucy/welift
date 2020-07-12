import React from 'react';
import { Router , Switch, Route, Redirect } from 'react-router-dom';
import history from './history';
import mainPage from './components/mainpage/index';
import signUp from './components/auth/signup';
import login from './components/auth/login';
import workout from './components/singleWorkout/index';
import createworkout from './components/createWorkout';




import '../src/style/index.css';
import '../src/style/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
            <Route exact path="/signup" component={signUp}/>
            <Route exact path="/signin" component={login}/>
            <Route exact path="/workout/:id" component={workout} />
            <Route exact path="/createworkout" component={createworkout} />
            <Route path="/" component={mainPage}/>
            <Redirect to="/"/>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
