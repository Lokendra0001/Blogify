import React from "react";
import { NavLink } from "react-router-dom";
import { User, FileText, LayoutDashboard } from "lucide-react";

function Dashboard() {
  return (
    <div className=" bg-white border-r border-blue-50 p-4 space-y-6 text-blue-900 ">
      <div className="flex items-center gap-3 border-b-2 pb-4 border-gray-100">
        <div className="p-2 bg-blue-100 rounded-lg">
          <LayoutDashboard className="w-5 text-[#1E53A2]" />
        </div>
        <h2 className="text-2xl font-bold bg-[#1E53A2] bg-clip-text text-transparent">
          Dashboard
        </h2>
      </div>

      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/myAccount"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-2 py-3 rounded-xl transition-all font-semibold text-md ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-blue-600 hover:bg-blue-100 hover:text-blue-900"
            }`
          }
        >
          <User className="w-5 h-5" />
          <span>My Account</span>
        </NavLink>

        <NavLink
          to="/myAccount/my-post"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2 py-3 rounded-xl transition-all font-semibold text-md ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-blue-600 hover:bg-blue-100 hover:text-blue-900"
            }`
          }
        >
          <FileText className="w-5 h-5" />
          <span>My Posts</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default Dashboard;
