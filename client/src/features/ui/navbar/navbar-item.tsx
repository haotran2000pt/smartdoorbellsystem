import classNames from "classnames";
import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface NavbarItemProps {
  to: string;
  text: string;
  icon: ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ to, text, icon }) => {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          classNames(
            "p-2 font-semibold transition-colors rounded-md flex items-center space-x-2",
            {
              "text-indigo-500 bg-indigo-100/60": isActive,
              "hover:bg-gray-200/60 text-gray-600": !isActive,
            }
          )
        }
        to={to}
      >
        <div className="text-lg">{icon}</div>
        <div>{text}</div>
      </NavLink>
    </li>
  );
};

export default NavbarItem;
