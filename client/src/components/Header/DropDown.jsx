import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import ThemeToggle from "../toggleTheme/ThemeToggle";
import { GoHeartFill } from "react-icons/go";
import { Context } from "../../utils/context";
import { useContext } from "react";
import { FaClipboardList } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function DropDown() {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  return (
    <Menu as="div" className="relative inline-block text-left text-whitesmoke ">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5  px-3 py-2 text-sm font-semibold  shadow-sm ">
          <FaUserAlt className="-mr-1 h-5 w-5 " aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
              <div
                onClick={() => navigate(`/favorite/${user._id}`)}
                className={`
                  ${
                    focus ? "bg-gray-800 text-whitesmoke opacity-80" : ""
                  } hover:bg-gray-700 flex gap-x-5  px-4 py-2 text-sm cursor-pointer`}
              >
                <GoHeartFill />
                <span>Favorites</span>
              </div>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <div
              onClick={()=>navigate("/my-profile")}
                className={`
                  ${
                    focus ? "bg-gray-800 text-whitesmoke opacity-80" : ""
                  } hover:bg-gray-700 flex gap-x-5  px-4 py-2 text-sm cursor-pointer`}
              >
                <FaUserAlt />
                <span>Your Profile</span>
              </div>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <div
              onClick={()=>navigate("/my-orders")}
                className={`
                  ${
                    focus ? "bg-gray-800 text-whitesmoke opacity-80" : ""
                  } hover:bg-gray-700 flex gap-x-5  px-4 py-2 text-sm cursor-pointer`}
              >
                <FaClipboardList />
                <span>Your Orders</span>
              </div>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <div
                className={`
                    ${
                      focus ? "bg-gray-800 text-whitesmoke opacity-80" : ""
                    } hover:bg-gray-700 cursor-pointer`}
              >
                <ThemeToggle />
              </div>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
