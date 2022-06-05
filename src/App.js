import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Petitionscore from './pages/Petitionscore';
import Petitionpersonnel from './pages/Petitionpersonnel';
import StudentForm from './pages/StudentForm';
import PersonnelForm from './pages/PersonnelForm';
import StudentStable from './pages/StudentStable';
import PersonnelStable from './pages/PersonnelStable';
import PetitionForm from './pages/PetitionForm'
import Swap from './pages/Swap';
import { useSelector } from "react-redux";
import {
  Routes,
  Route,
} from "react-router-dom";




function App() {
  const user = useSelector((state) => state.userInfo.value);

  return (
    <div className="App">
    
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personnel" element={<Swap />}>
          <Route index element={<PersonnelStable />} />
          <Route path="petition/:petition_id" element={<PetitionForm />} />
        </Route>
        <Route path="/student" element={<Swap />}>
          <Route index element={ <Petitionpersonnel />}/>
          <Route path="score" element={<Petitionscore/>} />
          <Route path="personnel" element={<Petitionpersonnel/>} />
          <Route path="petitionscore" element={<StudentStable />}/>
          <Route path="score/:subject_id" element={<StudentForm />} />
          <Route path="personnel/:personnel_id" element={<PersonnelForm />} />
          <Route path="petition/:petition_id" element={<PetitionForm />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
