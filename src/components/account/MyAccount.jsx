import { Container } from "../Index";
import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

function MyAccount() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Container className="h-screen bg-white relative">
      {/* Hamburger Menu for small screens */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`md:hidden fixed top-20 right-0 z-50 bg-white p-2 rounded shadow `}
      >
        <Menu className="w-6 h-6 text-blue-600" />
      </button>

      {/* Grid layout */}
      <div className="grid md:grid-cols-[250px_1fr] h-full">
        {/* Sidebar */}
        <div
          className={`fixed z-100 md:z-30 top-0 right-0  backdrop-blur-sm h-full w-[250px] bg-white border-r border-gray-200 transform transition-transform duration-300 md:sticky md:top-0 md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0 " : "translate-x-100"
          }`}
        >
          <Dashboard />
        </div>

        {/* Overlay (click to close sidebar) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 backdrop-blur-[2px] bg-opacity-30 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="bg-[#FBFBFB] p-4 overflow-y-auto min-h-screen">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}

export default MyAccount;
