"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { register } from "@/helpers/user.helper"; 
import { IRegister } from "@/interface/userInterface";
import { useState } from "react";
import { validateRegister } from "@/helpers/validation";
import Swal from "sweetalert2";

const initialValues: IRegister = {
  name: "",
  email: "",
  address: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = validateRegister;

const RegisterCard: React.FC = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false)


  const handleSubmit = async (values: IRegister) => {
    if (isRegister) return;
    setIsRegister(true);

    console.log("Registering...", values);

    const userData: IRegister = {
      name: values.name,
      email: values.email,
      address: values.address,
      phone: values.phone,
      password: values.password,
    };

    try {
      await register(userData);
      console.log("Register response data:", userData);

      Swal.fire({
        title: "Registration successful! ",
        confirmButtonText: "Login",
        confirmButtonColor: "#1e40af", 
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/logim");
        }
      });
      } catch (error) {
      console.error("Error in registration:", error);
     const errorMessage = (error as Error).message || "Error in registration. Please try again.";
     alert(errorMessage);
    } finally {
      setIsRegister(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:text-slate-100 dark:border-gray-700">
    
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className="space-y-6">
            <h1 className="text-xl font-bold text-center text-slate-700 dark:text-slate-200 mb-8">
              Register:
            </h1>
            <div className="w-full flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-6">
              <div className="flex flex-col lg:w-1/2">
                <label htmlFor="name" className="text-sm text-slate-700 dark:text-slate-200 mr-2">
                  Name:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full px-3 dark:text-slate-200 dark:bg-slate-900 py-2 rounded-md border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage name="name" component="span" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col lg:w-1/2">
                <label htmlFor="email" className="text-sm text-slate-700 dark:text-slate-200 mr-2">
                  Email:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@gmail.com"
                  className="w-full px-3 dark:text-slate-200 dark:bg-slate-900 py-2 rounded-md border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="span" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col lg:w-1/2">
                <label htmlFor="address" className="text-sm text-slate-700 dark:text-slate-200 mr-2">
                  Address:
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Street, city, country"
                  className="w-full px-3 dark:text-slate-200 dark:bg-slate-900 py-2 rounded-md border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage name="address" component="span" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col lg:w-1/2">
                <label htmlFor="phone" className="text-sm text-slate-700 dark:text-slate-200 mr-2">
                  Phone:
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="+598 097555111"
                  className="w-full px-3 dark:text-slate-200 dark:bg-slate-900 py-2 rounded-md border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage name="phone" component="span" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col lg:w-1/2">
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
                <ErrorMessage name="password" component="span" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col lg:w-1/2">
                <label htmlFor="confirmPassword" className="text-sm text-slate-700 dark:text-slate-200 mr-2">
                  Confirm Password:
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="***********"
                  className="w-full px-3 dark:text-slate-200 dark:bg-slate-900 py-2 rounded-md border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage name="confirmPassword" component="span" className="text-red-600 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={!(isValid && dirty) || isRegister}
                className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                  !(isValid && dirty) || isRegister ? "opacity-50 cursor-not-allowed" : ""
                }`}
                
              >
                {isRegister ? "Registering..." : "Register"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterCard;

