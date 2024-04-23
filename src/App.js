import GenerateForm from "./components/GenerateForm";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./App.css"
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<GenerateForm/>}/>
          {/* <Route exact path="/experience" element={<ExperienceForm />} /> */}
          {/* <Route exact path="/project" element={<ProjectForm/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
