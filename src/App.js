import Layout from './components/Layout';
import Login from './pages/Login';
import Landing from './pages/Landing';
import { connect } from "react-redux";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { LocalizationProvider } from '@mui/lab';
import { logout } from './utility/auth';
import { resetUser } from './store/actions/user.action';

function App(props) {
  // const history = useHistory();

  const logoutHanler = () => {
    console.log('herere')
    logout();
    props.resetUser();
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <Layout user={props.user || null} onLogout={logoutHanler}>
          <Switch>
            <Route path="/" exact><Landing /></Route>
            <Route path="/flights" exact><Landing /></Route>
            <Route path="/login" exact ><Login /></Route>
            <Route path="/signup" exact ><Login /></Route>
          </Switch>
        </Layout>
      </Router>
    </LocalizationProvider>
  )
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

const matchDispatchToProps = (dispatch) => {
  return { resetUser: () => dispatch(resetUser())}
}

export default connect(mapStateToProps,matchDispatchToProps)(App);
