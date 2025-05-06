import React, { useEffect, useState } from "react";
import { PlusIcon } from "./Icons";
import { FormControllerApi, FormTemplate, FormTemplateControllerApi } from "../typing";
import { useAuthStore } from "../stores/useAuthStore";

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

async function loadFormTemplates(): Promise<Array<FormTemplate>> {
  const api: FormTemplateControllerApi = new FormTemplateControllerApi();
  return api.getAllFormTemplates();
}

export const FormModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formTemplates, setFormTemplates] = useState<Array<FormTemplate> | null>(null);
  const [selectedFormTemplate, setSelectedFormTemplate] = useState<string | null>(null);
  const [contentData, setContentData] = useState<string[]>([]);
  const [signatureUsernames, setSignatureUsernames] = useState<string[]>([]);

  useEffect(() => {
    const getTemplates = async () => {
      try {
        const loadedTemplate: Array<FormTemplate> = await loadFormTemplates();
        setFormTemplates(loadedTemplate);
      }
      catch (error) {
        console.error("Failed to load form:", error);
      }
    }

    getTemplates();
  })

  async function createForm(): Promise<void> {
    const api: FormControllerApi = new FormControllerApi();
  
    //TODO: Get loginInformation
    api.createForm({ createFormRequest: {
      published: true,
      formTemplateIdentifier: selectedFormTemplate ?? undefined,
      username: useAuthStore.getState().userInfo?.username,
      formContent: contentData,
      signatureUsernames: signatureUsernames
    }})
  }

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
    <div>
      {formTemplates ?
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

            <form onSubmit={createForm} className="space-y-4">
              {/* Header Section */}
              <div className="space-y-2">
                <h3 className="font-semibold">Form Type</h3>
              </div>

                <select value={selectedFormTemplate ?? ''} onChange={(e) => setSelectedFormTemplate(e.target.value)} className="w-full p-2 border rounded-md">
                  <option value="" disabled>Select a template</option>
                  {formTemplates?.map((template) => (
                    <option key={template.formTemplateIdentifier} value={template.formTemplateIdentifier}>
                      {template.formTemplateIdentifier}
                    </option>
                  ))}
                </select>
                <div className="w-full h-1 bg-black mt-2"></div>
                <h1 className="font-bold">Content</h1>
                {formTemplates.find((template) => template.formTemplateIdentifier === selectedFormTemplate)?.formTemplateContentSet?.map((item, index) => (
                  <div>
                    <h3 className="font-semibold">{ item.contentName }</h3>
                    <input
                      type="text"
                      name="formType"
                      value={contentData[index] || ""}
                      onChange={(e) => {
                        const updated = [...contentData];
                        updated[index] = e.target.value;
                        setContentData(updated);
                      }}
                      placeholder="Data..."
                      className="w-full p-2 border rounded-md mt-2"
                      required
                    />
                  </div>

                ))}
                <div className="w-full h-1 bg-black mt-2"></div>
                <h1 className="font-bold">Signatures</h1>
                {formTemplates.find((template) => template.formTemplateIdentifier === selectedFormTemplate)?.formTemplateSignatureSet?.map((item, index) => (
                  <div>
                    <h3 className="font-semibold">Enter {item.title} User:</h3>
                    <input
                      type="text"
                      name="formType"
                      value={signatureUsernames[index] || ""}
                      onChange={(e) => {
                        const updated = [...signatureUsernames];
                        updated[index] = e.target.value;
                        setSignatureUsernames(updated);
                      }}
                      placeholder="Username..."
                      className="w-full p-2 border rounded-md mt-2"
                      required
                    />
                  </div>

                ))}

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
        :
        <div>loading...</div>
      }
    </div>


  );
};

export default FormModal;
