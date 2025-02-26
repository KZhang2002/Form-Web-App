import React, { useState } from "react";
import { PlusIcon } from "./Icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  formType: string;
  title: string;
  description: string;
  uniqueIdentifier: string;
  firstName: string;
  lastName: string;
  userLevel: string;
  formContents: string;
  signatures: { title: string; firstName: string; lastName: string; date: string }[];
}

export const FormModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    formType: "",
    title: "",
    description: "",
    uniqueIdentifier: "",
    firstName: "",
    lastName: "",
    userLevel: "",
    formContents: "",
    signatures: [{ title: "", firstName: "", lastName: "", date: "" }]
  });

  if (!isOpen) return null; // Hide modal if not open

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle changes in the signature fields
  const handleSignatureChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newSignatures = [...formData.signatures];
    newSignatures[index][name] = value;
    setFormData({ ...formData, signatures: newSignatures });
  };

  const clearValues = () => {
    setFormData({
      formType: "",
      title: "",
      description: "",
      uniqueIdentifier: "",
      firstName: "",
      lastName: "",
      userLevel: "",
      formContents: "",
      signatures: [{ title: "", firstName: "", lastName: "", date: "" }]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close modal after submitting
    clearValues();
  };

  // Function to add a new signature field
  const addSignature = () => {
    setFormData({
      ...formData,
      signatures: [
        ...formData.signatures,
        { title: "", firstName: "", lastName: "", date: "" },
      ],
    });
  };

// Function to remove a signature field by index
  const removeSignature = (index: number) => {
    const newSignatures = [...formData.signatures];
    newSignatures.splice(index, 1);
    setFormData({ ...formData, signatures: newSignatures });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative max-h-[80vh] overflow-y-auto">
        {/* Close button in the top right */}
        <button
          onClick={() => {
            onClose();
            clearValues();
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <PlusIcon />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Form Submission</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Header Section */}
          <div className="space-y-2">
            <h3 className="font-semibold">Form Type</h3>
            <input
              type="text"
              name="formType"
              value={formData.formType}
              onChange={handleChange}
              placeholder="Form Type"
              className="w-full p-2 border rounded-md"
              required
            />
            <h3 className="font-semibold">Title</h3>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title of the form"
              className="w-full p-2 border rounded-md"
              required
            />
            <h3 className="font-semibold">Description</h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description of the form"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Applicant Information Section */}
          <div className="space-y-2">
            <h3 className="font-semibold">Applicant Information</h3>
            <input
              type="text"
              name="uniqueIdentifier"
              value={formData.uniqueIdentifier}
              onChange={handleChange}
              placeholder="Unique Identifier"
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
            <select
              name="userLevel"
              value={formData.userLevel}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="" disabled selected className="text-gray-500">
                User Level
              </option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          {/* Form Contents Section */}
          <div className="space-y-2">
            <h3 className="font-semibold">Form Contents</h3>
            <textarea
              name="formContents"
              value={formData.formContents}
              onChange={handleChange}
              placeholder="Form contents..."
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Signatures Section */}
          <div className="space-y-2">
            <h3 className="font-semibold">Signatures</h3>
            {formData.signatures.map((signature, index) => (
              <div key={index} className="space-y-1">
                <input
                  type="text"
                  name="title"
                  value={signature.title}
                  onChange={(e) => handleSignatureChange(index, e)}
                  placeholder="Title of Reviewer"
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="firstName"
                  value={signature.firstName}
                  onChange={(e) => handleSignatureChange(index, e)}
                  placeholder="First Name of Reviewer"
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="lastName"
                  value={signature.lastName}
                  onChange={(e) => handleSignatureChange(index, e)}
                  placeholder="Last Name of Reviewer"
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="date"
                  name="date"
                  value={signature.date}
                  onChange={(e) => handleSignatureChange(index, e)}
                  className="w-full p-2 border rounded-md"
                />

                {/* Button to remove signature */}
                {formData.signatures.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSignature(index)}
                    className="text-red-500 mt-2"
                  >
                    Remove Signature
                  </button>
                )}
              </div>
            ))}

            {/* Button to add a new signature field */}
            <button
              type="button"
              onClick={addSignature}
              className="mt-4 text-blue-500"
            >
              Add Another Signature
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                clearValues();
              }}
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

export default FormModal;
