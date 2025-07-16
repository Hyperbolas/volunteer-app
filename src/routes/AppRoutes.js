import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';

// Pages
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Register from '../pages/Registration';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminEventManagement from '../pages/admin/AdminEventManagement';
import VolunteerMatchingForm from '../pages/admin/VolunteerMatchingForm';
import VolunteerParticipationHistory from '../pages/admin/VolunteerParticipationHistory';
import UserDashboard from '../pages/user/UserDashboard';
import UserNotifications from '../pages/user/UserNotifications';
import UserMatchedEvents from '../pages/user/UserMatchedEvents';
import UserProfileForm from '../pages/user/UserProfileForm';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Register />} />

            {/* Protected admin routes */}
            <Route
              path="/admin/AdminDashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/AdminEventManagement"
              element={
                <PrivateRoute>
                  <AdminEventManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/VolunteerMatchingForm"
              element={
                <PrivateRoute>
                  <VolunteerMatchingForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/VolunteerParticipationHistory"
              element={
                <PrivateRoute>
                  <VolunteerParticipationHistory />
                </PrivateRoute>
              }
            />

            {/* Protected user routes */}
            <Route
              path="/user/UserDashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/UserNotifications"
              element={
                <PrivateRoute>
                  <UserNotifications />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/UserMatchedEvents"
              element={
                <PrivateRoute>
                  <UserMatchedEvents />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/UserProfileForm"
              element={
                <PrivateRoute>
                  <UserProfileForm />
                </PrivateRoute>
              }
            />
        </Routes>
    );
};

export default AppRoutes;
