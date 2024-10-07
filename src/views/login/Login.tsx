"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/helpers/user.helper";
import { ILogin } from "@/interface/userInterface";
import { validateLogin } from "@/helpers/validation";
import Swal from "sweetalert2";

const initialValues: ILogin = {
  email: "",
  password: "",
};

const validationSchema = validateLogin;

const LoginCard: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (values: ILogin) => {
    
    if (isLoading) return; 
    setIsLoading(true); 

    console.log("Logging in...", values);

    const userData: ILogin = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await login(userData);
      console.log("Login Response Data:", response);

      if (response) {
        const { token, user } = response;

        localStorage.setItem("userData", JSON.stringify({ token, ...user }));

        window.dispatchEvent(new Event("userAuthenticated"));

      
        Swal.fire({
          title: "Login successful!",
          confirmButtonText: "Dashboard",
          confirmButtonColor: "#1e40af", 
          allowOutsideClick: false, 
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(`/user/${user.name}`);
          }
        });
      }
    } catch (error) {
      console.error("Error in login", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:text-slate-100 dark:border-gray-700">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className="space-y-6">
            <h1 className="text-xl font-bold text-center text-slate-700 dark:text-slate-200 mb-8">
              Login:
            </h1>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm text-slate-700 dark:text-slate-200 mr-2">
                Email:
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="name@gmail.com"
                className="w-full px-3 dark:text-slate-200 dark:bg-slate-900 py-2 rounded-md border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="span" className="text-red-600" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm text-slate-700 dark:text-slate-200 mr-2">
                Password:
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="***********"
                className="w-full px-3 dark:text-slate-200 dark:bg-slate-900 py-2 rounded-md border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <ErrorMessage name="password" component="span" className="text-red-600" />
            </div>

            <button
              type="submit"
              disabled={!(isValid && dirty) || isLoading} // Deshabilita el botón si ya se está enviando
              className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                !(isValid && dirty) || isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link href="/register" className="text-blue-700 hover:underline dark:text-blue-500">
                Create account
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginCard;
