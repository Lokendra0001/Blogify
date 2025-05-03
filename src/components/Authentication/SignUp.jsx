import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Input, Button } from "../Index";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/authService";
import { addUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const submit = async (data) => {
    const session = await authService.createAccount(data);
    if (session) {
      const user = await authService.getCurrentuser();
      dispatch(addUser(user));
      navigate("/");
    } else setErr("SignUp Failed." + session);
  };
  return (
    <Container>
      <div className="flex justify-center items-center px-4 py-6 bg-slate-50">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-3 bg-white shadow-lg rounded-lg p-6 w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Create Account
          </h2>

          {err && (
            <div className="animate-fade-in">
              <p className="text-red-500 text-sm font-medium bg-red-50 w-full py-2 px-4 text-center rounded-md border border-red-200  flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {err}
              </p>
            </div>
          )}

          <Input
            label="Username :"
            type="text"
            placeholder="e.g : angex24dj..."
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("name", { required: "Username is required!" })}
          />

          {errors.name && (
            <p className="text-red-500 text-sm pl-2">{errors.name.message}</p>
          )}
          <Input
            label="Email :"
            type="email"
            placeholder="e.g : abc@gmail.com"
            className=" p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email", { required: "Email is required!" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm pl-2">{errors.email.message}</p>
          )}
          <Input
            label="Password :"
            type="password"
            placeholder="e.g : 23lw*********"
            className=" p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("password", {
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "Password required atleast 8 characters!",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm pl-2">
              {errors.password.message}
            </p>
          )}
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 mt-3 text-white font-semibold py-2 rounded-md"
            name="SignUp"
          />

          <p className="text-center text-sm text-gray-500 mt-0">
            Already have an account?{" "}
            <span className="text-blue-500 hover:underline cursor-pointer">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </Container>
  );
}
