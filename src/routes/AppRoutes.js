import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Register from '../pages/Registration';
import Notifications from '../pages/Notifications';
import AdminEventManagement from '../pages/admin/AdminEventManagement';
import VolunteerMatchingForm from '../pages/admin/VolunteerMatchingForm';
import VolunteerParticipationHistory from '../pages/admin/VolunteerParticipationHistory';
import UserMatchedEvents from '../pages/user/UserMatchedEvents';
import UserProfileForm from '../pages/user/UserProfileForm';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Register/>} />
            <Route path="/notifications" element={<Notifications/>} />
            <Route path="/registration" element={<Register/>} />
            <Route path="/admin/AdminEventManagement" element={<AdminEventManagement/>} />
            <Route path="/admin/VolunteerMatchingForm" element={<VolunteerMatchingForm/>} />
            <Route path="/admin/VolunteerParticipationHistory" element={<VolunteerParticipationHistory/>} />                 
            <Route path="/user/UserMatchedEvents"  element={<UserMatchedEvents/>} />
            <Route path="/user/UserProfileForm" element={<UserProfileForm/>} />
        </Routes>
    ); 


};
export default AppRoutes