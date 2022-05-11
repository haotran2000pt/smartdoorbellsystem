import { motion } from "framer-motion";
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../ui/navbar/navbar";
import { NavbarProvider } from "../ui/navbar/navbar-context";
import { useAuth } from "../users/auth/auth.context";
import DashboardLoading from "./dashboard-loading";

const DashboardLayout = () => {
  const { status } = useAuth();
  const [showNavbar, setShowNavbar] = useState(false);

  const openNavbar = () => {
    setShowNavbar(true);
  };

  const closeNavbar = () => {
    setShowNavbar(false);
  };

  if (status === "loading") {
    return <DashboardLoading />;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/" />;
  }

  return (
    <NavbarProvider open={openNavbar} close={closeNavbar} isOpen={showNavbar}>
      <div className="flex min-h-screen relative">
        <Navbar />
        <motion.div className="flex-1 relative">
          <Outlet />
        </motion.div>
      </div>
    </NavbarProvider>
  );
};

export default DashboardLayout;
