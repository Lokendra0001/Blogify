import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { AuthLayout, PostForm, ProfileCard } from "./components/Index.jsx";
import {
  About,
  EditPost,
  Home,
  Login,
  Message,
  MyAccount,
  Post,
  PrivacyPolicy,
  Signup,
} from "./pages/Index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signUp",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },

      {
        path: "/addPost",
        element: <PostForm />,
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <PostForm />
          </AuthLayout>
        ),
      },

      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/myAccount",
        element: <MyAccount />,
        children: [
          { path: "/myAccount/", element: <ProfileCard /> },
          { path: "/myAccount/my-post", element: <EditPost /> },
          { path: "/myAccount/message", element: <Message /> },
        ],
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
