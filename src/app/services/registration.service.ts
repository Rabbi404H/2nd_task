import { Injectable, signal } from '@angular/core';
import { 
  JobCategory, 
  UserRegistration, 
  Address, 
  WorkingSkill, 
  CompleteRegistration, 
  SampleUser ,
} from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private registrationData = signal<Partial<UserRegistration & Address & { skills: WorkingSkill[] }>>({});

  private jobCategories: JobCategory[] = [
    {
      id: 1,
      title: 'General Category',
      description: 'For professionals like Doctors, Engineers, Teachers, etc.',
      type: 'general'
    },
    {
      id: 2,
      title: 'Special Skilled Category',
      description: 'For skilled workers like Electricians, Drivers, Technicians, etc.',
      type: 'special'
    },
    {
      id: 3,
      title: 'Protibondhi Category',
      description: 'Special category for people with disabilities',
      type: 'protibondhi'
    }
  ];

  private districts = [
    'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'
  ];

  private thanas: { [key: string]: string[] } = {
    'Dhaka': ['Gulshan', 'Banani', 'Dhanmondi', 'Mohammadpur', 'Uttara'],
    'Chattogram': ['Kotwali', 'Double Mooring', 'Pahartali', 'Panchlaish'],
    'Rajshahi': ['Boalia', 'Motihar', 'Shah Makhdum'],
    'Khulna': ['Khalishpur', 'Sonadanga', 'Daulatpur']
  };

  private skills: WorkingSkill[] = [
    { id: 1, name: 'Web Development', selected: false },
    { id: 2, name: 'Mobile App Development', selected: false },
    { id: 3, name: 'Graphic Design', selected: false },
    { id: 4, name: 'Digital Marketing', selected: false },
    { id: 5, name: 'Content Writing', selected: false },
    { id: 6, name: 'Data Entry', selected: false }
  ];




  // ✅ All Job Categories
  getJobCategories(): JobCategory[] {
    return this.jobCategories;
  }

  // ✅ Districts & Thanas
  getDistricts(): string[] {
    return this.districts;
  }

  getThanas(district: string): string[] {
    return this.thanas[district] || [];
  }

  // ✅ Skills
  getSkills(): WorkingSkill[] {
    return [...this.skills];
  }

  // ✅ Registration Data Handling
  updateRegistrationData(data: Partial<UserRegistration | Address | { skills: WorkingSkill[] }>) {
    this.registrationData.update(current => ({ ...current, ...data }));
  }

  getCurrentData() {
    return this.registrationData();
  }

  resetData() {
    this.registrationData.set({});
  }

  getCompleteRegistrationData(): CompleteRegistration {
    return this.registrationData() as CompleteRegistration;
  }

  // ✅ Sample Users (for Login System)
  getSampleUsers(): SampleUser[] {
    return [
       { id: 1, name: 'Abdul Karim', email: 'kdrabbihossain056@gmail.com', password: 'password1', profession: 'Software Engineer', location: 'Dhaka', skills: ['JavaScript','Angular'], joinDate: '2 months ago', avatar: '👨‍💻' },
      { id: 2, name: 'Abdul Karim', email: 'abdul.k@example.com', password: 'password1', profession: 'Software Engineer', location: 'Dhaka', skills: ['JavaScript','Angular'], joinDate: '2 months ago', avatar: '👨‍💻' },
      { id: 3, name: 'Fatima Begum', email: 'fatima@example.com', password: 'password2', profession: 'Graphic Designer', location: 'Chattogram', skills: ['Figma','Photoshop'], joinDate: '1 month ago', avatar: '👩‍🎨' },
      { id: 4, name: 'Rahim Ahmed', email: 'rahim@example.com', password: 'password3', profession: 'Digital Marketer', location: 'Sylhet', skills: ['SEO'], joinDate: '3 weeks ago', avatar: '👨‍💼' },
      { id: 5, name: 'Ayesha Khan', email: 'ayesha@example.com', password: 'password4', profession: 'Data Analyst', location: 'Rajshahi', skills: ['Python','SQL'], joinDate: '2 weeks ago', avatar: '👩‍🔬' },
      { id: 6, name: 'Hasan Mahmud', email: 'hasan@example.com', password: 'password5', profession: 'Electrician', location: 'Khulna', skills: ['Wiring','Maintenance'], joinDate: '1 week ago', avatar: '🧰' },
      { id: 7, name: 'Rina Akter', email: 'rina@example.com', password: 'password6', profession: 'Teacher', location: 'Mymensingh', skills: ['English','Math'], joinDate: '5 days ago', avatar: '👩‍🏫' },
      { id: 8, name: 'Tanvir Islam', email: 'tanvir@example.com', password: 'password7', profession: 'Driver', location: 'Barishal', skills: ['Driving','Mechanics'], joinDate: '1 month ago', avatar: '🚗' },
      { id: 9, name: 'Nasrin Jahan', email: 'nasrin@example.com', password: 'password8', profession: 'Nurse', location: 'Rangpur', skills: ['Patient Care'], joinDate: '3 weeks ago', avatar: '👩‍⚕️' },
      { id: 10, name: 'Sabbir Hossain', email: 'sabbir@example.com', password: 'password9', profession: 'Technician', location: 'Chattogram', skills: ['Electronics','Repair'], joinDate: '2 months ago', avatar: '🔧' },
      { id: 11, name: 'Mitu Rahman', email: 'mitu@example.com', password: 'password10', profession: 'Web Designer', location: 'Dhaka', skills: ['HTML','CSS','UI Design'], joinDate: '1 week ago', avatar: '👩‍💻' },
    ];
  }

 

  // ✅ Registration Completion
  completeRegistration() {
    const current = this.registrationData();
    const rawAddress = (current as any).address;
    const addressObj: Address = rawAddress && typeof rawAddress === 'object'
      ? (rawAddress as Address)
      : ({} as Address);

    const completeData: CompleteRegistration = {
      ...(current as any),
      address: addressObj,
      registrationDate: new Date()
    };
    console.log('Registration Completed:', completeData);
    return completeData;
  }
}
