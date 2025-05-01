import React from "react";
import { useDispatch } from "react-redux";
import { Container, Input, Button } from "../Index";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/authService";
import { addUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (data) => {
    const session = await authService.createAccount(data);
    if (session) {
      const user = await authService.getCurrentuser();
      dispatch(addUser(user));
      navigate("/");
    }
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

          <Input
            label="Username :"
            type="text"
            placeholder="e.g : angex24dj..."
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("name", { required: "userName is required" })}
          />
          <Input
            label="Email :"
            type="email"
            placeholder="e.g : abc@gmail.com"
            className=" p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email", { required: "Email is required" })}
          />
          <Input
            label="Password :"
            type="password"
            placeholder="e.g : 23lw*********"
            className=" p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("password", { required: "Password is required" })}
          />

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
