import { Routes, Route } from 'react-router-dom';
// import NavBar from "../components/UserNavBar";

//Pages
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Register from '../pages/Registration';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminCreateEvent from '../pages/admin/AdminCreateEvent';
import AdminViewEvents from '../pages/admin/AdminViewEvents';
import VolunteerMatchingForm from '../pages/admin/VolunteerMatchingForm';
import VolunteerParticipationHistory from '../pages/admin/VolunteerParticipationHistory';
import UserDashboard from '../pages/user/UserDashboard';
import UserNotifications from '../pages/user/UserNotifications';
import UserMatchedEvents from '../pages/user/UserMatchedEvents';
import UserProfileForm from '../pages/user/UserProfileForm';



const AppRoutes = () => {
    const handleSubmit = (formData) => {
        console.log("Submitted event data:", formData);
    };
    return (
        <>
        {/* <NavBar/> */}
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Register/>} /> 
            <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/admin/AdminViewEvents" element={<AdminViewEvents/>} />
            <Route path="/admin/AdminCreateEvent" element={<AdminCreateEvent onSubmit={handleSubmit}/>} />
            <Route path="/admin/VolunteerMatchingForm" element={<VolunteerMatchingForm/>} />
            <Route path="/admin/VolunteerParticipationHistory" element={<VolunteerParticipationHistory/>} />
            <Route path="/user/UserDashboard" element={<UserDashboard/>} />  
            <Route path="/user/UserNotifications" element={<UserNotifications/>} />            
            <Route path="/user/UserMatchedEvents"  element={<UserMatchedEvents/>} />
            <Route path="/user/UserProfileForm" element={<UserProfileForm/>} />
        </Routes>
        </> /*removed duplicate registration*/
    ); 


};
export default AppRoutes