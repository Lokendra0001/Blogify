import { Footer, Header } from "./components/Index";
import authService from "./appwrite/authService";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./store/authSlice";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const loadingUser = async () => {
      const user = false;
      if (user) {
        dispatch(addUser(user));
      } else {
        dispatch(removeUser());
      }
    };
    loadingUser();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
