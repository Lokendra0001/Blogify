import React from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/authService";
import logoutPng from "../../assests/logout (2).png";
function LogoutBtn({ children, className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logoutAccount();
    dispatch(removeUser());
    localStorage.removeItem("session"); // Clear the session
    navigate("/login");
  };
  return (
    <button
      onClick={handleLogout}
      className={`cursor-pointer ${className}`}
      title="LogOut"
    >
      {children ? children : <img src={logoutPng} alt="" width={25} />}
    </button>
  );
}

export default LogoutBtn;
