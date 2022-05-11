import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DashboardLayout from "./features/dashboard/dashboard";
import AuthLayout from "./features/users/auth/auth-layout";
import DevicesPage from "./pages/devices";
import HomePage from "./pages/home";
import { LoginPage } from "./pages/login";
import NotificationsPage from "./pages/notifications";
import { SignUpPage } from "./pages/signup";
import { QueryClient, QueryClientProvider } from "react-query";
import AccountPage from "./pages/account";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="devices" element={<DevicesPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route index element={<Navigate to="notifications" />} />
            <Route path="*" element={<Navigate to="notifications" />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;
