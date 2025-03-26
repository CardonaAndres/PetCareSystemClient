import './assets/css/index.css';
import { router } from './configs/router';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from './modules/home/page/HomePage';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './modules/auth/pages/LoginPage';
import { RegisterPage } from './modules/auth/pages/RegisterPage';
import { ProtectedRoute } from './modules/auth/components/ProtectedRoute';
import { Dashboard } from './modules/dashboard/page/Dashboard';

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
              
              
              
              </Route>
            </Routes>
          </Router>
      </AuthProvider>
  )
}

export default App
