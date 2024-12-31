import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LoginForm from './form/LoginForm';
import Registerform from './form/Registerform';
import TaskTable from './Table/TaskTable';
function App() {
  return (

    <div className="App">
            <Router>

      <div>
        <Routes>
          <Route path="/" element={<Registerform />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Table" element={<TaskTable />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
