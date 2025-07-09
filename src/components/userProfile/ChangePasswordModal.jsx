import React, { useState, useEffect } from "react";
import PasswordStrength from "../authComponents/signUp/passwordStrength"; 
import { passwordRequirements, calculatePasswordStrength } from "../authComponents/signUp/passwordUtils";

const ChangePasswordModal = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    setStrength(calculatePasswordStrength(newPassword, passwordRequirements));
  }, [newPassword]);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("🔒 New passwords do not match!");
      return;
    }

    if (strength < 80) {
      alert("⚠️ Please strengthen your password before proceeding.");
      return;
    }

    // TODO: Connect to API
    alert("✅ Password changed successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 animate-fade-in">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">🔐 Change Password</h2>
          <p className="text-sm text-gray-500 mt-1">
            Keep your account secure by updating your password.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-600">Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter new password"
            />
            
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Confirm new password"
            />
            <PasswordStrength
              password={newPassword}
              passwordStrength={strength}
              requirements={passwordRequirements}
            />
          </div>
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium text-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
            className="px-5 py-2.5 rounded-md bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold text-black transition"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
