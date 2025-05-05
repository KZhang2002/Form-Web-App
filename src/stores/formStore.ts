import {create} from "zustand";
import {Form, FormControllerApi, GetFormsByAuthorRequest, GetFormsBySigneeRequest, UserControllerApi} from "../typing";
import {headerToKeyMap} from "../Home";

// Define your store type
interface FormStore {
  sectionHeaders: string[];
  setSectionHeaders: (headers: string[]) => void;
  listData: Form[];
  setListData: (data: Form[]) => void;
  processedListData: any[];
  setProcessedListData: (data: any[]) => void;
  fetchFormData: (filterType: string, userInfo: any) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  sectionHeaders: [],
  listData: [],
  processedListData: [],
  setSectionHeaders: (headers: string[]) => set({ sectionHeaders: headers }),
  setListData: (data: Form[]) => set({ listData: data }),
  setProcessedListData: (data: any[]) => set({ processedListData: data }),

  fetchFormData: async (filterType: string, userInfo: any) => {
    console.log(`Attempting fetch data for section: ${filterType ?? "default"}`);

    let forms = [];

    try {
      const formApi = new FormControllerApi();
      const userApi = new UserControllerApi();

      // Determine section headers based on filterType and set the state
      if (filterType === "userList") {
        set({ sectionHeaders: ["Username", "First Name", "Last Name", "Level", "Title"] });
      } else {
        set({ sectionHeaders: ["Level", "Author", "Signatures", "Form Name", "Form Type", "Date"] });
      }

      switch (filterType) {
        case "sent":
          const sentParams: GetFormsByAuthorRequest = { username: userInfo?.loginCredential?.username ?? "" };
          forms = await formApi.getFormsByAuthor(sentParams);
          break;

        case "userList":
          forms = await userApi.getUsers();
          break;

        case "formList":
          forms = await formApi.getForms();
          break;

        case "default":
        default:
          if (!userInfo?.loginCredential?.username) {
            console.warn("No username found; skipping fetch.");
            return;
          }

          const signeeParams: GetFormsBySigneeRequest = { username: userInfo?.loginCredential?.username ?? "" };
          forms = await formApi.getFormsBySignee(signeeParams);
          break;
      }

      console.log("Fetched forms:", forms);
      set({ listData: forms });

      const listRows = forms.map((form: any) =>
        set.state.sectionHeaders.map((header) => {
          const key = headerToKeyMap[header];
          return form?.[key] ?? ""; // Fallback to empty string if key doesn't exist
        })
      );

      set({ processedListData: listRows });
    } catch (e) {
      console.error(`Failed to fetch forms for section ${filterType}:`, e);
    }
  },
}));
