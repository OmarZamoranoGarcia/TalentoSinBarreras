import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Registro} from './login/Registro'
import { Login } from './login/Login'
import {LandingPage} from './landingPage/LandingPage'
import {Home} from './home/Home'

function App() {
  return(
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/registro" element={<Registro />} />
    //   </Routes>
    // </Router>
    <Home/>
  );
}

export default App