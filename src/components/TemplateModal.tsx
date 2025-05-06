import { useState } from "react";
import { PlusIcon } from "./Icons";
import { FormTemplateContent, FormTemplateControllerApi, FormTemplateSignature } from "../typing";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
}

async function createTemplate(): Promise<void> {

}

export const TemplateModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formIdentifier, setFormIdentifier] = useState<string>("");
    const [formTitle, setFormTitle] = useState<string>("");
    const [formDescription, setFormDescription] = useState<string>("");
    const [formContentNames, setFormContentNames] = useState<string[]>([]);
    const [formSignatureTitles, setFormSignatureTitles] = useState<string[]>([]);
    const [formSignatureLevels, setFormSignatureLevels] = useState<number[]>([]);

    const addContentType = () => {
        const updated = [...formContentNames];
        updated.push("");
        setFormContentNames(updated);
    }

    const removeContentType = () => {
        const updated = [...formContentNames];
        updated.pop();
        setFormContentNames(updated);
    }

    const addSignature = () => {
        const updated = [...formSignatureTitles];
        updated.push("");
        setFormSignatureTitles(updated);
    }

    const removeSignature = () => {
        const updated = [...formSignatureTitles];
        updated.pop();
        setFormSignatureTitles(updated);
    }

    const createFormTemplateContent = (): FormTemplateContent[] => {
        const contents: FormTemplateContent[] = [];

        for(var name of formContentNames) {
            contents.push({ 
                contentName: name,
                contentType: "text"
            });
        }

        return contents;
    }

    const createFormTemplateSignatures = (): FormTemplateSignature[] => {
        const signatures: FormTemplateSignature[] = [];

        for(let i = 0; i < formSignatureTitles.length; i++) {
            signatures.push({ 
                level: formSignatureLevels[i],
                title: formSignatureTitles[i]
            });
        }

        return signatures;
    }

    async function createTemplate(): Promise<void> {
        const api: FormTemplateControllerApi = new FormTemplateControllerApi();

        api.createFormTemplate({ createFormTemplateRequest: {
            formTemplateIdentifier: formIdentifier,
            formTitle: formTitle,
            formDescription: formDescription,
            formTemplateContents: createFormTemplateContent(),
            formTemplateSignatures: createFormTemplateSignatures()
        }})
    }

    if (!isOpen) return null;
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative max-h-[80vh] overflow-y-auto">
                    {/* Close button in the top right */}
                    <button
                        onClick={() => {
                            onClose();
                        }}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        <PlusIcon />
                    </button>

                    <h2 className="text-xl font-bold mb-4 text-center">Template Creation</h2>

                    <form onSubmit={createTemplate} className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold">Identifier</h3>
                        </div>
                        <input
                            type="text"
                            name="formType"
                            value={formIdentifier || ""}
                            onChange={(e) => {
                                setFormIdentifier(e.target.value);
                            }}
                            placeholder="Identifier..."
                            className="w-full p-2 border rounded-md mt-2"
                            required
                        />

                        <div className="space-y-2">
                            <h3 className="font-semibold">Title</h3>
                        </div>
                        <input
                            type="text"
                            name="formType"
                            value={formTitle || ""}
                            onChange={(e) => {
                                setFormTitle(e.target.value);
                            }}
                            placeholder="Title..."
                            className="w-full p-2 border rounded-md mt-2"
                            required
                        />

                        <div className="space-y-2">
                            <h3 className="font-semibold">Description</h3>
                        </div>
                        <input
                            type="text"
                            name="formType"
                            value={formDescription || ""}
                            onChange={(e) => {
                                setFormDescription(e.target.value);
                            }}
                            placeholder="Title..."
                            className="w-full p-2 border rounded-md mt-2"
                            required
                        />

                        <div className="w-full h-1 bg-black mt-2"></div>
                        <h1 className="font-bold">Content Types</h1>
                        {formContentNames.map((item, index) => (
                            <div>
                                <h3 className="font-semibold">Content Name {index + 1}:</h3>
                                <input
                                    type="text"
                                    name="formType"
                                    value={formContentNames[index] || ""}
                                    onChange={(e) => {
                                        const updated = [...formContentNames];
                                        updated[index] = e.target.value;
                                        setFormContentNames(updated);
                                    }}
                                    placeholder="Name..."
                                    className="w-full p-2 border rounded-md mt-2"
                                    required
                                />
                            </div>

                        ))}

                        <div className="w-full h-1 bg-black mt-2"></div>
                        <h1 className="font-bold">Signature Titles</h1>
                        {formSignatureTitles.map((item, index) => (
                            <div>
                                <h3 className="font-semibold">Signature Title {index + 1}:</h3>
                                <input
                                    type="text"
                                    name="formType"
                                    value={formSignatureTitles[index] || ""}
                                    onChange={(e) => {
                                        const updated = [...formSignatureTitles];
                                        updated[index] = e.target.value;
                                        setFormSignatureTitles(updated);
                                    }}
                                    placeholder="Title..."
                                    className="w-full p-2 border rounded-md mt-2"
                                    required
                                />
                                <h3 className="font-semibold">Signature Level {index + 1}:</h3>
                                <input
                                    type="text"
                                    name="formType"
                                    value={formSignatureLevels[index] || 0}
                                    onChange={(e) => {
                                        const updated = [...formSignatureLevels];
                                        updated[index] = parseInt(e.target.value);
                                        setFormSignatureLevels(updated);
                                    }}
                                    placeholder="Title..."
                                    className="w-full p-2 border rounded-md mt-2"
                                    required
                                />
                            </div>

                        ))}

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={removeContentType}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                            >
                                Remove Content
                            </button>

                            <button
                                type="submit"
                                onClick={addContentType}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Add Content
                            </button>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={removeSignature}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                            >
                                Remove Signature
                            </button>

                            <button
                                type="submit"
                                onClick={addSignature}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Add Signature
                            </button>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    onClose();
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
        </div>
    );
}

export default TemplateModal;