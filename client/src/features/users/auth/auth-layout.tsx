import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./auth.context";

const AuthLayout = () => {
  const { status } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "authenticated") {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return status === "unauthenticated" ? (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000")`,
      }}
      className="w-screen h-screen flex-center bg-gray-200"
    >
      <motion.div
        className="p-7 bg-white rounded shadow-lg w-[480px]"
        initial={{ opacity: 0.7, scale: 1.05, y: -75 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.5, type: "spring", bounce: 0.4 },
        }}
        exit={{
          opacity: 0,
          scale: 1.05,
          y: -50,
          transition: { duration: 0.15 },
        }}
      >
        <Outlet />
      </motion.div>
    </div>
  ) : null;
};

export default AuthLayout;
