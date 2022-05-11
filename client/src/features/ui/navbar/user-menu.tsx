import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "src/features/users/auth/auth.context";
import Divider from "../divider/divider";
import Popover from "../popover/popover";
import NavbarItem from "./navbar-item";

const UserMenu = () => {
  const { user, logout } = useAuth();

  return (
    <Popover
      placement="top"
      content={
        <div className="px-5 py-2">
          <div className="my-2">
            <div className="text-[16px] font-bold">{user?.username}</div>
            <div className="font-semibold text-gray-600">{user?.email}</div>
          </div>
          <Divider />
          <ul className="-mx-2 mb-0.5">
            <NavbarItem
              icon={<AiOutlineUser size={18} />}
              to="account"
              text="Tài khoản"
            />
          </ul>
          <div
            onClick={logout}
            className="py-2 hover:bg-gray-100 -mx-2 px-2 cursor-pointer rounded-lg font-semibold flex items-center space-x-2"
          >
            <div>
              <IoLogOutOutline size={18} />
            </div>
            <div>Đăng xuất</div>
          </div>
        </div>
      }
    >
      <div className="hover:bg-white/10 cursor-pointer transition border-t p-3 flex items-center space-x-2 hover:bg-gray-200">
        <FaUserCircle className="text-indigo-600" size={24} />
        <div className="font-bold">{user?.username}</div>
      </div>
    </Popover>
  );
};

export default UserMenu;
