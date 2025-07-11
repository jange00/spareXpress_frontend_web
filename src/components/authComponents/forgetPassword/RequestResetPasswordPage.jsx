import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRequestResetPassword } from "../../../hook/useLoginUserTan";
import { Mail } from "lucide-react";

export default function RequestResetPasswordPage() {
  const navigate = useNavigate();
  const requestResetPassword = useRequestResetPassword();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await requestResetPassword.mutateAsync(values);
        navigate("/sign-in");
      } catch (error) {
        console.error("Error requesting reset password:", error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl relative animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">🔐 Forgot Password</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email to receive the reset link.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-400">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="ml-3 w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm mt-1 font-medium">
                {formik.errors.email}
              </p>
            ) : null}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-yellow-500 hover:bg-yellow-600 text-black shadow-md transition focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-400"
            >
              Request Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
