import { Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import ProtectedRoute from './Components/ProtectedRoute';
import './App.css';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';


function App() {

  return (
    <div className="main-container">
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <ProtectedRoute exact path='/' component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
