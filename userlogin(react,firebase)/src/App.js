import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Dashboard from "./welcome";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
