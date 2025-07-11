import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../../../hook/useLoginUserTan";
import { Lock, X } from "lucide-react";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const resetPassword = useResetPassword();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await resetPassword.mutateAsync({ data: values, token });
        alert("✅ Password reset successful!");
        navigate("/sign-in");
      } catch (error) {
        alert("❌ Error resetting password. Try again.");
        console.error("Error resetting password:", error);
      }
    },
  });

  const handleCancel = () => navigate("/login");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative animate-fade-in">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleCancel}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          🔒 Reset Password
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your new password below.
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="mt-1 flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                className="ml-2 w-full outline-none text-gray-700 placeholder-gray-400"
                placeholder="Enter new password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1 flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="ml-2 w-full outline-none text-gray-700 placeholder-gray-400"
                placeholder="Confirm new password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
