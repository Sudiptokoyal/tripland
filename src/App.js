import Layout from './components/Layout';
import Login from './pages/Login';
import Landing from './pages/Landing';
import { connect } from "react-redux";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { LocalizationProvider } from '@mui/lab';

function App(props) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <Layout user={props.user || null}>
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

export default connect(mapStateToProps)(App);
