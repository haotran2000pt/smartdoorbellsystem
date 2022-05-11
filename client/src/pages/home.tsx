import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "src/features/users/auth/auth.context";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { status, logout } = useAuth();

  return (
    <div>
      <div>Trang chu</div>
      {status === "unauthenticated" && (
        <>
          <Link to="/login">Dang nhap</Link>
          <Link to="/signup">Dang ky</Link>
        </>
      )}
      {status === "authenticated" && (
        <>
          <Link to="/dashboard">Vao app</Link>
          <button onClick={logout}>Dang xuat</button>
        </>
      )}
    </div>
  );
};

export default HomePage;
