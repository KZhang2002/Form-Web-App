import {
  Form,
  FormContent,
  FormSignature, FormTemplate,
  FormTemplateContent,
  FormTemplateSignature,
  LoginCredential,
  UserInfo
} from "./typing";

// interface UserInfo {
//   username: string;
//   admin: boolean;
//   firstName: string;
//   lastName: string;
//   level: number;
//   title: string;
// }
//
// interface LoginCredential {
//   username: string;
//   password: string;
//   email: string;
//   setPassword: boolean;
// }
//
// interface FormTemplate {
//   formTemplateIdentifier: string;
//   formTitle: string;
//   formDescription: string;
// }

interface dummyData {
  userInfo: UserInfo[];
  loginCredentials: LoginCredential[];
  formTemplates: FormTemplate[];
  formTemplateContent: FormTemplateContent[];
  formTemplateSignature: FormTemplateSignature[];
  forms: Form[];
  formContent: FormContent[];
  formSignatures: FormSignature[];
}

export const dummyData:dummyData = {
  userInfo: [
    { username: 'mwilkinson', admin: true, firstName: 'Martha', lastName: 'Wilkinson', level: 4, title: 'Admin' },
    { username: 'bgoldorf', admin: true, firstName: 'Brian', lastName: 'Goldorf', level: 4, title: 'Admin' },
    { username: 'mthomson', admin: true, firstName: 'Melene', lastName: 'Thomson', level: 4, title: 'Admin' },
    { username: 'lmonroe', admin: false, firstName: 'Lisbeth', lastName: 'Monroe', level: 3, title: 'Provost' },
    { username: 'jweiner', admin: false, firstName: 'Jacob', lastName: 'Weiner', level: 3, title: 'Registrar' },
    { username: 'rflood', admin: false, firstName: 'Robert', lastName: 'Flood', level: 3, title: 'Budget Officer' },
    // Add remaining user objects here following the same structure
  ],

  loginCredentials: [
    { username: 'mwilkinson', password: 'Mw123#', email: 'kennyz@smu.edu', setPassword: true },
    { username: 'bgoldorf', password: 'Bg123#', email: 'kennyz@smu.edu', setPassword: true },
    { username: 'mthomson', password: 'Mt123#', email: 'kennyz@smu.edu', setPassword: true },
    { username: 'lmonroe', password: 'Lm123#', email: 'kennyz@smu.edu', setPassword: true },
    // Add remaining credentials here
  ],

  formTemplates: [
    { formTemplateIdentifier: 'GA001', formTitle: 'Graduation Application', formDescription: 'This form must be completed by a student who is about to graduate. It must be approved by the Department chair, the Dean of the College and the Registrar.' },
    { formTemplateIdentifier: 'GR001', formTitle: 'Grade Appeal', formDescription: 'This form must be completed by a student. It must be approved by the Faculty member, Department chair, the Dean of the College and the Registrar.' },
    { formTemplateIdentifier: 'IG001', formTitle: 'Internal Grant Application', formDescription: 'This form must be completed by a faculty member or a librarian (Level 1 user). It is meant for requesting funding for research from SMU. It must be approved by the Dean of the college and Vice Chancellor for Academic Affairs.' },
    // Add remaining form templates here
  ],

  formTemplateContent: [
    { contentName: 'Firstname', contentType: 'text', formTemplateIdentifier: 'GA001' },
    { contentName: 'Lastname', contentType: 'text', formTemplateIdentifier: 'GA001' },
    { contentName: 'Major', contentType: 'text', formTemplateIdentifier: 'GA001' },
    // Add remaining content elements here
  ],

  formTemplateSignature: [
    { level: 2, title: 'Dept. Chair', formTemplateIdentifier: 'GA001' },
    { level: 3, title: 'Dean of Engineering', formTemplateIdentifier: 'GA001' },
    { level: 3, title: 'Registrar', formTemplateIdentifier: 'GA001' },
    // Add remaining form signatures here
  ],

  forms: [
    { archived: false, published: true, publishDate: '2023-04-10', formTemplateIdentifier: 'GA001', username: 'dbensen' },
    { archived: false, published: true, publishDate: '2023-04-10', formTemplateIdentifier: 'GR001', username: 'salbert' },
    { archived: false, published: true, publishDate: '2023-04-10', formTemplateIdentifier: 'GR001', username: 'rsuzuki' },
    // Add remaining forms here
  ],

  formContent: [
    { formId: 1, templateId: '1', contentData: 'Delores' },
    { formId: 1, templateId: '2', contentData: 'Bensen' },
    { formId: 1, templateId: '3', contentData: 'Computer Science (graduate)' },
    // Add remaining content entries here
  ],

  formSignatures: [
    { formId: 1, templateId: '1', username: 'brichman', signed: false, approved: null, denialReason: null, date: null },
    { formId: 1, templateId: '2', username: 'rmarcos', signed: false, approved: null, denialReason: null, date: null },
    { formId: 1, templateId: '3', username: 'jweiner', signed: false, approved: null, denialReason: null, date: null },
    // Add remaining signature entries here
  ]
};

// Example usage
console.log(dummyData.userInfo);
