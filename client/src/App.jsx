import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';
import OfficerPage from './pages/OfficerPage';
import CitizenPage from './pages/CitizenPage';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import AdminSignup from './components/Auth/AdminRegister';
import RTONavbar from './components/ReusableComponents/Navbar';
import UserList from './components/Admin/userManagement';
import AppointmentsList from './components/Appointments/Appointmentlist';
import LicenseList from './components/licence/licenceslist';
import ReportsList from './components/reports/reportlist';
import VehicleList from './components/vehicle/vehiclelist';

function App() {
  return (
    <>
   
     <AuthProvider>
     
     <Router>
     <RTONavbar/>
       <Routes>
         {/* Define routes using element instead of component */}
         <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/signup" element={<SignupPage />} />

         {/*  admin */}
         <Route path="/admin" element={<AdminPage />} />
         <Route path="/admin/register" element={<AdminSignup />} />
         <Route path="/admin/userlist" element={<UserList />} />
         <Route path="/admin/appointments" element={<AppointmentsList />} />
         <Route path="/admin/licenses" element={<LicenseList />} />
         <Route path="/admin/totalreports" element={<ReportsList />} />
          <Route path="/admin/vehicles" element={<VehicleList />} />
         {/* admin/totalreports */}

        

         {/* officer */}
         <Route path="/officer" element={<OfficerPage />} />
         
         {/* citizen */}
         <Route path="/citizen" element={<CitizenPage />} />
       </Routes>
     </Router>
   </AuthProvider>
    </>
   
  );
}

export default App;
