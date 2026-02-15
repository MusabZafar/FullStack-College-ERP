import { useLogout } from "@/utils/useLogout";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";

function ProfileMenu({ openMenu, setOpenMenu }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const [user, setUser] = useState(null);

  const logout = useLogout();

  useEffect(() => {
    const storedData =
      localStorage.getItem("studentData") ||
      localStorage.getItem("professorData") ||
      localStorage.getItem("hodData");

    if (storedData) {
      try {
        const parsedUser = JSON.parse(storedData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Menu open={openMenu} handler={setOpenMenu} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="gray"
          className="flex items-center gap-2 px-2 py-1 md:px-3 md:py-2 bg-gray-100 rounded-full shadow-md"
        >
          {/* Avatar for medium to large screens */}
          <Avatar
            src={user.imageUrl || "https://via.placeholder.com/40"}
            alt={"User"}
            className="rounded-full w-8 h-8 md:w-10 md:h-10 hidden lg:block"
          />
          {/* Username for medium to large screens */}
          <Typography
            variant="small"
            className="text-gray-700 hidden sm:block lg:block"
          >
            {user.studName || user.name || "John Doe"}
          </Typography>
        </Button>
      </MenuHandler>
      <MenuList className="w-44 p-2 shadow-lg">
        <MenuItem>
          <Link
            to={`/dashboard/${userRole}/information`}
            className="flex items-center gap-2"
          >
            <AiOutlineUser className="text-gray-600 h-5 w-5" />
            <span className="">Profile</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/settings" className="flex items-center gap-2">
            <AiOutlineSetting className="text-gray-600 h-5 w-5" />
            <span className="">Settings</span>
          </Link>
        </MenuItem>
        <MenuItem onClick={logout} className="flex items-center gap-2">
          <AiOutlineLogout className="text-gray-600 h-5 w-5" />
          <span className="">Logout</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;
