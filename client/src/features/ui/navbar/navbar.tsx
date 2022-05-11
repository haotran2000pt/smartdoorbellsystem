import React, { useRef } from "react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import NavbarItem from "./navbar-item";
import UserMenu from "./user-menu";
import { motion } from "framer-motion";
import { useNavbar } from "./navbar-context";
import useOnClickOutside from "src/hooks/useOnClickOutside";

const Navbar = () => {
  const { isOpen, close } = useNavbar();
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    close();
  });

  return (
    <motion.div
      ref={ref}
      style={{ left: isOpen ? 0 : -240 }}
      className="w-[240px] h-screen border-r flex flex-col bg-gray-50
    flex-shrink-0 top-0 md:sticky fixed z-50 md:z-0 transition-all"
    >
      <div className="border-b bg-gray-50 flex items-center px-4 text-xl font-semibold h-[50px]">
        Logo
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <ul className="px-3 py-6">
          <NavbarItem
            icon={<IoMdNotificationsOutline />}
            to="notifications"
            text="Thông báo"
          />
          <NavbarItem
            icon={<AiOutlineVideoCamera />}
            to="devices"
            text="Thiết bị"
          />
        </ul>
        <UserMenu />
      </div>
    </motion.div>
  );
};

export default Navbar;
