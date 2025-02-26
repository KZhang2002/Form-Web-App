import React, { useState } from "react";
import { PlusIcon } from "./Icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  userLevel: string;
}

export const UserFormModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    userLevel: "", // todo jank do fixy
  });

  if (!isOpen) return null; // Hide modal if not open

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearValues = () => {
    setFormData({
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      userLevel: ""
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close modal after submitting
    clearValues();
  };

  const exit = () => {
    onClose();
    clearValues();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50" >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close button in the top right */}
        <button
          onClick={exit}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <PlusIcon/>
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">User Information</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-2 border rounded-md"
            required
          />

          <select
            name="userLevel"
            value={formData.userLevel}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            {/*<option value="User">User</option>*/}
            {/*<option value="Admin">Admin</option>*/}
            {/*<option value="Guest">Guest</option>*/}
            <option value="" disabled selected>
              User Level
            </option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={exit}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
