import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

import MuiThemeProvider from'@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'
//Components

import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'
import NavBar from './Components/NavBar'
import themeFile from './Util/theme'
import AuthRoute from './Util/AuthRoute'
//pages
import home from './Pages/home'
import login from './Pages/login'
import signup from './Pages/signup'
import axios from 'axios'
const theme = createMuiTheme(themeFile)
const token = localStorage.FBIdToken;
console.log(token)
if (token) {
  console.log(token)
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider  store={store}>
        <div className="App">
        <Router>
          <div class="container">
            <NavBar/>
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
