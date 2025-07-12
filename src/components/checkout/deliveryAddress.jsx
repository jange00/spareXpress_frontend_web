import { useState, useEffect } from "react";
import {
  MapPin,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  Edit,
  Plus,
  Home,
  Building,
} from "lucide-react";
import { usePostShippingAddress } from "../../hook/admin/useShippingAddress/usePostShippingAddress";
import { useGetShippingByUser } from "../../hook/admin/useShippingAddress/useGetShippingByUser";

export const DeliveryAddress = ({
  userId,
  selectedAddress,
  isExpanded,
  onToggle,
  onAddressSelect,
}) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    streetAddress: "",
    postalCode: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
  });

  const postAddressMutation = usePostShippingAddress();
  const { data: addresses = [], isLoading } = useGetShippingByUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const addressPayload = {
      streetAddress: formData.streetAddress,
      postalCode: formData.postalCode,
      city: formData.city,
      district: formData.district,
      province: formData.province,
      country: formData.country,
    };

    postAddressMutation.mutate(addressPayload, {
      onSuccess: () => setShowAddressForm(false),
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div
        className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-[#FFB800]" />
          Delivery Address
        </h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4">
          {!showAddressForm ? (
            <div>
              {isLoading ? (
                <p className="text-gray-600">Loading addresses...</p>
              ) : (
                addresses.map((address) => (
                  <div
                    key={address._id}
                    className={`border ${
                      selectedAddress?._id === address._id
                        ? "border-[#FFB800]"
                        : "border-gray-200"
                    } rounded-lg p-4 mb-3 relative cursor-pointer`}
                    onClick={() => onAddressSelect(address)}
                  >
                    {selectedAddress?._id === address._id && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="w-5 h-5 text-[#FFB800]" />
                      </div>
                    )}
                    <div className="flex items-start">
                      <div className="p-2 bg-gray-100 rounded-full mr-3">
                        {address.type === "home" ? (
                          <Home className="w-5 h-5 text-gray-600" />
                        ) : (
                          <Building className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{address.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.streetAddress}, {address.city}, {address.district}, {address.province}, {address.postalCode}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{address.country}</p>
                        <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div className="flex mt-4">
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="flex items-center text-[#FFB800] hover:text-[#FFB800]/80 mr-4"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Address
                </button>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="flex items-center text-[#FFB800] hover:text-[#FFB800]/80"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add New Address
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Add Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries({
                  streetAddress: "Street Address",
                  postalCode: "Postal Code",
                  city: "City",
                  district: "District",
                  province: "Province",
                  country: "Country",
                }).map(([key, label]) => (
                  <div key={key} className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label}*
                    </label>
                    <input
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder={label}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90"
                >
                  Save Address
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};