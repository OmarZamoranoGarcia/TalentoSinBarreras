import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Registro} from './login/Registro'
import { Login } from './login/Login'
import {LandingPage} from './landingPage/LandingPage'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App