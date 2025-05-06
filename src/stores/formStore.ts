import {create} from "zustand";
import {
  Form,
  FormControllerApi,
  GetFormsByAuthorRequest,
  GetFormsBySigneeRequest,
  UserControllerApi,
  UserInfo
} from "../typing";
import {headerToKeyMap} from "../Home";

// Define your store type
interface FormState {
  currentListData: (UserInfo | Form)[];
  processedListData: (UserInfo | Form)[];
  // userInfo: UserInfo;
  sectionHeaders: string[];
}

export const headerToKeyMap: Record<string, string> = {
  "Username": "username",
  "First Name": "firstName",
  "Last Name": "lastName",
  "Level": "level",
  "Title": "title",
  "Author": "author",
  "Signatures": "signatures",
  "Form Name": "formName",
  "Form Type": "formType",
  "Date": "date"
};

export const useFormStore = create<FormState>((set, get) => ({
  currentListData: [],
  // userInfo: null,
  sectionHeaders: [],

  setCurrentListData: (listData: (UserInfo | Form)[]) => {
    set(() => ({
      currentListData: listData,
    }));
  },

  fetchFormData : async ({string: filterType, userInfo: user}) => {
    console.log(`Attempting fetch data for section: ${filterType ?? "default"}`);

    let forms = [];
    let headers: string[] = [];

    try {
      const formApi = new FormControllerApi();
      const userApi = new UserControllerApi();

      if (filterType === "userList") {
        headers = ["Username", "First Name", "Last Name", "Level", "Title"];
      } else {
        headers = ["Level", "Author", "Signatures", "Form Name", "Form Type", "Date"];
      }

      set({ sectionHeaders: headers });

      switch (filterType) {
        case "sent":
          const sentParams: GetFormsByAuthorRequest = { username: user?.loginCredential?.username ?? "" };
          forms = await formApi.getFormsByAuthor(sentParams);
          break;

        case "userList":
          forms = await userApi.getUsers();
          break;

        case "formList":
          forms = await formApi.getForms();
          break;

        default:
          const signeeParams: GetFormsBySigneeRequest = { username: user?.loginCredential?.username ?? "" };
          forms = await formApi.getFormsBySignee(signeeParams);
          break;
      }

      if (forms) set({ currentListData: forms });

      const listRows = forms.map((form: any) =>
        headers.map(header => {
          const key = headerToKeyMap[header];
          return form?.[key] ?? "";
        })
      );

      set ({processedListData: listRows});
    } catch (e) {
      console.error(`Failed to fetch forms for section ${filterType}:`, e);
    }
  },
}));