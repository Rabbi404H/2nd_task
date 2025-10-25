export interface JobCategory {
  id: number;
  title: string;
  description: string;
  type: 'general' | 'special' | 'protibondhi';
}

export interface UserRegistration {
  name: string;
  gender: string;
  email?: string;
  mobile?: string;
  countryCode: string;
  password: string;
  age: number;
  acceptTerms: boolean;
  jobNotifications: boolean;
}

export interface Address {
  district: string;
  thana: string;
  postOffice: string;
  address: string;
  alternateMobile: string;
}

export interface WorkingSkill {
  id: number;
  name: string;
  selected: boolean;
}

export interface InfoBox {
  title: string;
  description: string;
}

export interface CompleteRegistration {
  jobCategory?: JobCategory;
  userInfo?: UserRegistration;
  address?: Address;
  skills?: WorkingSkill[];
  registrationDate?: Date;
}

export interface SampleUser {
  id: number;
  name: string;
  profession: string;
  location: string;
  skills: string[];
  joinDate: string;
  avatar?: string;
}