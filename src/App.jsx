import './assets/css/index.css';
import { router } from './configs/router';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from './modules/home/page/HomePage';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './modules/auth/pages/LoginPage';
import { RegisterPage } from './modules/auth/pages/RegisterPage';
import { ProtectedRoute } from './modules/auth/components/ProtectedRoute';
import { Dashboard } from './modules/dashboard/page/Dashboard';
import { ProfilePage } from './modules/users/pages/ProfilePage';
import { AdminPage } from './modules/admin/pages/AdminPage';
import { AccessControl } from './modules/auth/components/AccessControl';
import { AppointmentsManager } from './modules/pets/pages/AppointmentsManager';

function App() {
  return (
        <AuthProvider >
          <Router>
            <Routes>
              <Route path={router.home} element={<HomePage />} />
              <Route path={router.Login} element={<LoginPage />} />
              <Route path={router.register} element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path={router.dashboard} element={<Dashboard />} />
                <Route path={router.profile} element={<ProfilePage />} />
                <Route path={router.appointments} element={<AppointmentsManager />} />

                <Route element={<AccessControl />}>
                  <Route path={router.admin} element={<AdminPage />} />
                  
                </Route>

              </Route>
            </Routes>
          </Router>
      </AuthProvider>
  )
}

export default App
