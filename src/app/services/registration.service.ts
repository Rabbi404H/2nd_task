import { Injectable, signal } from '@angular/core';
import { 
  JobCategory, 
  UserRegistration, 
  Address, 
  WorkingSkill, 
  CompleteRegistration, 
  SampleUser 
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

  getJobCategories(): JobCategory[] {
    return this.jobCategories;
  }

  getDistricts(): string[] {
    return this.districts;
  }

  getThanas(district: string): string[] {
    return this.thanas[district] || [];
  }

  getSkills(): WorkingSkill[] {
    return [...this.skills];
  }

  updateRegistrationData(data: Partial<UserRegistration | Address | { skills: WorkingSkill[] }>) {
    this.registrationData.update(current => ({ ...current, ...data }));
  }

  getCurrentData() {
    return this.registrationData();
  }

  resetData() {
    this.registrationData.set({});
  }

  // === তোমার নতুন যুক্ত অংশ ===

  getCompleteRegistrationData(): CompleteRegistration {
    return this.registrationData() as CompleteRegistration;
  }

  getSampleUsers(): SampleUser[] {
    return [
      {
        id: 1,
        name: 'Abdul Karim',
        profession: 'Software Engineer',
        location: 'Dhaka, Bangladesh',
        skills: ['JavaScript', 'Angular', 'Node.js'],
        joinDate: '2 months ago',
        avatar: '👨‍💻'
      },
      {
        id: 2,
        name: 'Fatima Begum',
        profession: 'Graphic Designer',
        location: 'Chattogram, Bangladesh',
        skills: ['UI/UX Design', 'Adobe Photoshop', 'Figma'],
        joinDate: '1 month ago',
        avatar: '👩‍🎨'
      },
      {
        id: 3,
        name: 'Rahim Ahmed',
        profession: 'Digital Marketer',
        location: 'Sylhet, Bangladesh',
        skills: ['SEO', 'Social Media', 'Content Marketing'],
        joinDate: '3 weeks ago',
        avatar: '👨‍💼'
      },
      {
        id: 4,
        name: 'Ayesha Khan',
        profession: 'Data Analyst',
        location: 'Rajshahi, Bangladesh',
        skills: ['Python', 'SQL', 'Data Visualization'],
        joinDate: '2 weeks ago',
        avatar: '👩‍🔬'
      }
    ];
  }

  completeRegistration() {
    const current = this.registrationData();
    // Normalize address so it always matches the Address type expected by CompleteRegistration
    const rawAddress = (current as any).address;
    const addressObj: Address = rawAddress && typeof rawAddress === 'object'
      ? (rawAddress as Address)
      : ({} as Address);

    const completeData: CompleteRegistration = {
      ...(current as any),
      address: addressObj,
      registrationDate: new Date()
    };
    // Here you can send data to backend or store in database
    console.log('Registration Completed:', completeData);
    return completeData;
  }
}
