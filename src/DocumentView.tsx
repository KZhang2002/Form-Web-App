import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import './Home'
import NavBar from "./components/NavBar";
import { NavDrawer } from "./components/NavDrawer";
import { RequestIcon, SentIcon, DraftIcon } from "./components/Icons";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { LoginInfo } from './Login';
import { Form, FormControllerApi, FormSignature, FormTemplate, FormTemplateControllerApi, UserControllerApi, UserInfo } from './typing';
import {useAuthStore} from "./stores/useAuthStore";

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
  formId: number;
  refreshForm: (formId: number) => Promise<void>;
}

const DocumentToolDrawer: React.FC<DocToolProps> = ({ formId, refreshForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const navigate = useNavigate();

  const [approvalInfo, setApprovalInfo] = useState<ApprovalInfo>({ approve: false, reason: "" });
  const [error, setError] = useState("");

  const location = useLocation();
  const docInfo: any = location.state || {};

  const [form, setForm] = useState<Form | null>(null);
  const [formTemplate, setFormTemplate] = useState<FormTemplate | null>(null);
  const [authorInfo, setAuthorInfo] = useState<UserInfo | null>(null);
  const [signatureUserInfos, setSignatureUserInfos] = useState<Array<UserInfo> | null>(null);

  const userInfo = useAuthStore((state) => state.userInfo);

  async function refreshLocalForm(formId: number): Promise<void> {
    const updatedForm = await loadForm(formId);
    setForm(updatedForm);
  }

  async function handleUserList(): Promise<void> {
    if(form?.formId)
      await refreshLocalForm(form?.formId);
    setIsUserListOpen(true);
  }

  useEffect(() => {
    const getForm = async () => {
      try {
        const loadedForm = await loadForm(formId);
        setForm(loadedForm);
        if (loadedForm.formId != null) {
          const loadedTemplate = await loadTemplate(loadedForm.formId);
          setFormTemplate(loadedTemplate);

          const loadedUser = await loadUserInfo(loadedForm.formId);
          setAuthorInfo(loadedUser);

          const loadedSignatureUsers = await loadUserInfoFromSignatures(loadedForm);
          setSignatureUserInfos(loadedSignatureUsers);
        }
      } catch (error) {
        console.error("Failed to load form:", error);
      }
    };
    getForm();
  }, [formId]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setApprovalInfo((prev) => ({ ...prev, [name]: value }));
  }

  async function handleApproval(): Promise<void> {
    const user = signatureUserInfos?.find(u => u.username === authorInfo?.username);

    const api: FormControllerApi = new FormControllerApi();

    // username is person who attempts to sign
    await api.signForm({ signFormRequest: { formId: form?.formId, username: authorInfo?.username, approved: approvalInfo.approve, denialReason: approvalInfo.approve ? "" : approvalInfo.reason }})

    if(form?.formId)
      refreshForm(form.formId);

    setIsModalOpen(false);
  }

  const handleBlur = (): string => {
    let errorText = "";
    if (!approvalInfo.approve && approvalInfo.reason == "") {
      errorText = "Reason can not be empty";
    }
    else {
      errorText = "";
    }

    setError(errorText);
    return errorText;
  }

  const handleDelete = (): void => {
    const api: FormControllerApi = new FormControllerApi();

    api.deleteForm( { formId: form?.formId ?? 0 })

    navigate('/home');
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
            onClick={() => {
              if(form?.formSignatureSet?.find(u => u.userInfo?.username === userInfo?.username)?.approved == null){
                console.log(form?.formSignatureSet?.find(u => u.userInfo?.username === userInfo?.username)?.approved);
                setIsModalOpen(true)
              }
            }}>Document Approval
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl font-bold">Document Approval</h2>
            <div className="flex">
              <div>
                <p>Approval Status</p>
                <fieldset>
                  <div>
                    <input
                      type="radio"
                      id="approve"
                      value="approve"
                      name="drone"
                      className="m-3"
                      onClick={() => setApprovalInfo((prev) => ({...prev, approve: true}))}
                    />
                    <label htmlFor="approve">Approve</label>

                    <input
                      type="radio"
                      id="deny"
                      value="deny"
                      name="drone"
                      className="m-3"
                      onClick={() => setApprovalInfo((prev) => ({...prev, approve: false}))}
                    />
                    <label htmlFor="deny">Deny</label>
                  </div>
                </fieldset>

                {!approvalInfo.approve && (
                  <textarea
                    rows={6}
                    cols={37}
                    name="reason"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="border-2"
                    placeholder="Provide reason for denial"
                  />
                )}
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
                    handleApproval();
                  }
                }}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded cursor-pointer right-justify right-element"
              >
                Submit
              </button>
            </div>

          </Modal>
          <Modal isOpen={isUserListOpen} onClose={() => setIsUserListOpen(false)}>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">User List</h2>
              <div className="flex justify-between items-center w-full mt-2">
                <div className="mt-2">Name</div>
                <div className="mt-2">Approval Status</div>
                <div className="mt-2">Denial Reason</div>
              </div>
              <div className='mt-2'>
                {signatureUserInfos?.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-center w-full mt-2">
                      <div>{item.lastName}, {item.firstName}</div>
                      {form?.formSignatureSet && form.formSignatureSet[index].signed
                        ? form?.formSignatureSet && form.formSignatureSet[index].approved ?
                          <div>Approved</div>
                          :
                          <div>Denied</div>
                        : <div>Not Yet Approved</div>}
                      {form?.formSignatureSet && form.formSignatureSet[index].signed
                        ? form?.formSignatureSet && form.formSignatureSet[index].approved ?
                          <div>N/A</div>
                          :
                          <div>{form.formSignatureSet[index].denialReason}</div>
                        : <div>N/A</div>}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsUserListOpen(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer left-element"
              >
                Close
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
            onClick={() => handleUserList()}>User List
          </div>
        </div>
      </div>
      { authorInfo?.username === userInfo?.username ?
        <div data-layer="Delete"
        className="Delete self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden cursor-pointer">
        <div data-layer="state-layer"
          className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
          <div data-layer="Label"
            className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight"
            onClick={() =>  handleDelete() }>Delete
          </div>
        </div>
      </div>
      :
       <div></div>}
      
    </div>
  )
}

// const loadDocument = async (formId: number) => {
//   try {
//     const api = new FormControllerApi();
//     const form = await api.getForm({ formId: formId });
//
//     form.
//
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

async function loadForm(formId: number): Promise<Form> {
  console.log("Loading Form");
  const api = new FormControllerApi();
  return api.getForm({ formId: formId });
}

async function loadTemplate(formId: number): Promise<FormTemplate> {
  const api = new FormTemplateControllerApi();
  return api.getTemplateFromForm({ formId: formId });
}

async function loadUserInfo(formId: number): Promise<UserInfo> {
  const api = new UserControllerApi();
  return api.getUserFromForm({ formId: formId });
}

async function loadUserInfoFromSignatures(form: Form): Promise<Array<UserInfo>> {
  const api = new UserControllerApi();
  const userInfos: Array<UserInfo> = new Array<UserInfo>();
  let userInfo: UserInfo;

  if (form.formSignatureSet != null) {
    for (const signature of form.formSignatureSet) {
      if (signature.id != null) {
        userInfo = await api.getUserFromSignature({ signatureId: signature.id });
        userInfos.push(userInfo);
      }
    }
  }
  return userInfos;

}

export const DocumentView = () => {
  const location = useLocation();
  // const loginInfo: LoginInfo = location.state || { username: "Placeholder", password: "Placeholder" }; // todo add zustand to simplify passing down data

  const [form, setForm] = useState<Form | null>(null);
  const [formTemplate, setFormTemplate] = useState<FormTemplate | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [signatureUserInfos, setSignatureUserInfos] = useState<Array<UserInfo> | null>(null);

  const { formId } = useParams();

  async function refreshForm(formId: number): Promise<void> {
    const updatedForm = await loadForm(formId);
    setForm(updatedForm);
  }

  useEffect(() => {
    console.log("form id", formId);
    const getForm = async () => {
      try {
        const loadedForm = await loadForm(formId);
        setForm(loadedForm);
        console.log("loaded form", loadedForm)
        if (loadedForm.formId != null) {
          const loadedTemplate = await loadTemplate(loadedForm.formId);
          setFormTemplate(loadedTemplate);

          console.log("form template", loadedTemplate);

          const loadedUser = await loadUserInfo(loadedForm.formId);
          setUserInfo(loadedUser);

          const loadedSignatureUsers = await loadUserInfoFromSignatures(loadedForm);
          setSignatureUserInfos(loadedSignatureUsers);
        }
      } catch (error) {
        console.error("Failed to load form:", error);
      }
    };
    getForm();
  }, []);

  return (
    <div>
      <div className="DefaultLayout w-full h-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
        <NavBar showAccount={true} />
      </div>
      {form && formTemplate && userInfo && signatureUserInfos ? (
        <div data-layer="Content" className="Content h-[995px] justify-start items-center gap-2.5 flex">
          <NavDrawer />
          <div className="h-screen flex flex-1 justify-center items-center bg-gray-200 self-stretch">
            <div className="bg-white w-[800px] h-[800px] p-8 shadow-lg rounded-lg">
              <div className="flex flex-col">
                <div className="relative w-full h-6">
                  <div className="absolute left-1/2 transform -translate-x-1/2">SOUTHERN METHODIST UNIVERSITY</div>
                  <div className="absolute right-0">Form Type: {formTemplate?.formTemplateIdentifier}</div>
                </div>
                <div className="mt-2 text-center">{formTemplate?.formTitle}</div>
                <div className="mt-2">{formTemplate?.formDescription}</div>
                <div className="w-full h-1 bg-black mt-2"></div>
                <div className="flex justify-between items-center w-full mt-2">
                  <div>Level: {userInfo?.level}</div>
                  <div>Firstname: {userInfo?.firstName}</div>
                  <div>Lastname: {userInfo?.lastName}</div>
                  <div>Title: {userInfo?.title}</div>
                  <div>FormID: {form?.formId}</div>
                </div>
                <div className="w-full h-1 bg-black mt-2"></div>
                <div className="mt-2">
                  {form?.formContentSet?.map((item, index) => {
                    console.log("item", item);
                    console.log("form", form);
                    return (
                      <div key={index} className="mb-2 whitespace-pre-wrap">
                        <span
                          className="font-semibold">{formTemplate?.formTemplateContentSet?.[index]?.contentName}: </span>
                        {item.contentData?.replaceAll('\\n', '\n')}
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  <div>Signature of the applicant: {userInfo?.lastName}, {userInfo?.firstName}</div>
                  <div>Date: {form?.publishDate?.toLocaleDateString()}</div>
                </div>
                <div className="w-full h-1 bg-black mt-2"></div>
                <div className='mt-2 font-semibold'>Signatures:</div>
                <div className="flex justify-between items-center w-full mt-2">
                  <div>Level</div>
                  <div>Firstname</div>
                  <div>Lastname</div>
                  <div>Signature</div>
                  <div>Date</div>
                </div>
                <div className='mt-2'>
                  {signatureUserInfos?.map((item, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between items-center w-full mt-2">
                        <div>{item.level}</div>
                        <div>{item.firstName}</div>
                        <div>{item.lastName}</div>
                        {form?.formSignatureSet && form.formSignatureSet[index].signed
                          ? <div>{item.lastName}, {item.firstName}</div>
                          : <div>Not Yet Approved</div>}
                        {form?.formSignatureSet && form.formSignatureSet[index].signed
                          ? <div>{form.formSignatureSet[index].date?.toLocaleDateString()}</div>
                          : <div>   </div>}
                      </div>
                    </div>
                  ))}
                </div>


              </div>

            </div>
          </div>
          <DocumentToolDrawer formId={formId} refreshForm={refreshForm} />
        </div>
      ) : (
        <div>Loading...</div>
      )}



    </div>


  )
};

export default DocumentView;