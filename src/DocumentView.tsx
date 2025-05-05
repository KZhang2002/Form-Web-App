import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import './Home'
import NavBar from "./components/NavBar";
import { NavDrawer } from "./components/NavDrawer";
import { RequestIcon, SentIcon, DraftIcon } from "./components/Icons";
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginInfo } from './Login';
import { Form, FormControllerApi } from './typing';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export interface ApprovalInfo {
  approve: boolean;
  reason: string;
}

type DocToolProps = {
  loginInfo: LoginInfo;
}

const DocumentToolDrawer: React.FC<DocToolProps> = ({ loginInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [approvalInfo, setApprovalInfo] = useState<ApprovalInfo>({ approve: false, reason: "" });
  const [error, setError] = useState("");

  const location = useLocation();
  const docInfo: any = location.state || {};

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setApprovalInfo((prev) => ({ ...prev, [name]: value }));
  }

  const handleBlur = (): string => {
    let errorText = "";
    if (approvalInfo.reason == "") {
      errorText = "Reason can not be empty";
    }
    else {
      errorText = "";
    }

    setError(errorText);
    return errorText;
  }

  return (
    <div data-layer="Navigation Drawer/Default"
      className="NavigationDrawerDefault w-[306px] h-[995px] p-3 bg-[#f7f2fa] flex-col justify-start items-start inline-flex overflow-hidden">
      <div data-layer="Inbox"
        className="Inbox self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden">
        <div data-layer="state-layer"
          className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
          <div data-layer="Label"
            className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight cursor-pointer"
            onClick={() => setIsModalOpen(true)}>Document Approval
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl font-bold">Document Approval</h2>
            <div className="flex">
              <div>
                <p>Approval Status</p>
                <fieldset>
                  <div>
                    <input type="radio" id="approve" value="approve" name="drone" className="m-3"
                      onClick={() => setApprovalInfo((prev) => ({ ...prev, approve: true }))} />
                    <label htmlFor="approve">Approve</label>
                    <input type="radio" id="deny" value="deny" name="drone" className="m-3"
                      onClick={() => setApprovalInfo((prev) => ({ ...prev, approve: false }))} />
                    <label htmlFor="approve">Deny</label>
                  </div>
                </fieldset>
                <textarea rows={6} cols={43} name="reason" onChange={handleInputChange} onBlur={handleBlur} className="border-2" />
              </div>
            </div>
            {error && <p className=" text-red-500">{error}</p>}
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer left-element"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (!handleBlur()) {
                    setIsModalOpen(false)
                  }
                }}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded cursor-pointer right-justify right-element"
              >
                Submit
              </button>
            </div>

          </Modal>
        </div>
      </div>
      <div data-layer="Sent"
        className="Sent self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden">
        <div data-layer="state-layer"
          className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
          <div data-layer="Label"
            className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight cursor-pointer"
            onClick={() => navigate("/userList", { state: { loginInfo } })}>User List
          </div>
        </div>
      </div>
      <div data-layer="Delete"
        className="Delete self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden cursor-pointer">
        <div data-layer="state-layer"
          className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
          <div data-layer="Label"
            className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight"
            onClick={() => navigate("/home", { state: { loginInfo } })}>Delete
          </div>
        </div>
      </div>
    </div>
  )
}

  // const loadDocument = async (formId: number) => {
  //   try {
  //     const api = new FormControllerApi();
  //     const form = await api.getForm({ formId: formId });

  //     form.

  //     if(!user.loginCredential?.setPassword) {
  //       navigate("/reset_password", {state: loginInfo});
  //     }
  //     else {
  //       setLoading(false);
  //       navigate("/home", {state: loginInfo});
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     if (error.response?.status === 401) {
  //       setError("Invalid username or password");
  //     } else {
  //       setError("An error occurred. Please try again.");
  //     }
  //   }
  // };

  async function loadForm(): Promise<Form> {
    const api = new FormControllerApi();
    return api.getForm({ formId: 1 });
  }


export const DocumentView = () => {
  const location = useLocation();
  const loginInfo: LoginInfo = location.state || { username: "Placeholder", password: "Placeholder" }; // todo add zustand to simplify passing down data

  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    const getForm = async () => {
      try {
        const loadedForm = await loadForm();
        setForm(loadedForm);
        console.log("Form");
        console.log(loadedForm);
      } catch (error) {
        console.error("Failed to load form:", error);
      }
    };
    getForm();
  }, []);

  return (
    <div>
      <div className="DefaultLayout w-full h-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
        <NavBar username={loginInfo.username} showAccount={true} />
      </div>
      <div data-layer="Content" className="Content h-[995px] justify-start items-center gap-2.5 flex">
        <NavDrawer />
        <div className="h-screen flex flex-1 justify-center items-center bg-gray-200 self-stretch">
          <div className="bg-white w-[800px] h-[800px] p-8 shadow-lg rounded-lg">
            <div className="relative w-full h-16">
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <p className="text-center">SOUTHERN METHODIST UNIVERSITY</p>
              </div>
              <div className="absolute right-4">
                <p>{form?.formTemplate?.formTemplateIdentifier}</p>
              </div>
            </div>
          </div>
        </div>
        <DocumentToolDrawer loginInfo={loginInfo} />
      </div>

    </div>


  )
};

export default DocumentView;