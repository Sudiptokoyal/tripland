import Layout from './components/Layout';
import Login from './pages/Login';
import Landing from './pages/Landing';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
