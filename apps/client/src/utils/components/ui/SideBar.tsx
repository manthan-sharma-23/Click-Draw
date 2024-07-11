import { Link } from "react-router-dom";
import { SideBarOptions } from "../../config/sideBar.config";

const SideBar = () => {
  return (
    <div className="w-[20%] h-full flex flex-col gap-3 justify-start items-center">
      {SideBarOptions.map((option, index) => (
        <Link
          key={index}
          to={option.link}
          className="flex items-center gap-3 text-xl py-2 w-[95%] px-4 rounded-md hover:bg-gray-50/10 "
        >
          <option.icon />
          <p>{option.name}</p>
        </Link>
      ))}
    </div>
    
  );
};

export default SideBar;
