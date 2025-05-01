import { Footer, Header } from "./components/Index";
import authService from "./appwrite/authService";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./store/authSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadingUser = async () => {
      const user = await authService.getCurrentuser();
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
