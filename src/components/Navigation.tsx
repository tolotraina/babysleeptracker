import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-primary p-4">
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white hover:text-blue-200 ${isActive ? "font-bold underline" : ""}`
            }
            end
          >
            List Sleep Entry
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-sleep"
            className={({ isActive }) =>
              `text-white hover:text-blue-200 ${isActive ? "font-bold underline" : ""}`
            }
          >
            Add Sleep Entry
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;