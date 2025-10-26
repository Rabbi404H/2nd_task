import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserRegistration } from '../../models/registration.model';

@Component({
  selector: 'app-account-creation',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent],
  template: `
    <div class="page-container">
      <div class="container">
        <div class="content-grid">
          <div class="main-content">
            <div class="form-card">
              <h2 class="form-title">Create Your Account</h2>

              <form [formGroup]="accountForm" (ngSubmit)="onSubmit()">
                <div class="form-content">
                  
                  <!-- Full Name -->
                  <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" formControlName="name" placeholder="Enter your full name" class="form-input" />
                    @if (accountForm.get('name')?.invalid && accountForm.get('name')?.touched) {
                      <div class="error">Name is required</div>
                    }
                  </div>

                  <!-- Gender -->
                  <div class="form-group">
                    <label>Gender</label>
                    <div class="gender-options">
                      @for (gender of genders; track gender.value) {
                        <label class="radio-option">
                          <input type="radio" formControlName="gender" [value]="gender.value" class="radio-input" />
                          <span>{{ gender.label }}</span>
                        </label>
                      }
                    </div>
                  </div>

                  <!-- Email or Mobile -->
                  <div class="form-group">
                    <label>Contact Method</label>
                    <div class="toggle-buttons">
                      <button
                        type="button"
                        (click)="toggleContactMethod('email')"
                        [class.active]="contactMethod() === 'email'"
                        class="toggle-btn"
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        (click)="toggleContactMethod('mobile')"
                        [class.active]="contactMethod() === 'mobile'"
                        class="toggle-btn"
                      >
                        Mobile
                      </button>
                    </div>

                    @if (contactMethod() === 'mobile') {
                      <div class="mobile-input-group">
                        <select formControlName="countryCode" (change)="onCountryChange()" class="country-select">
                          <option value="+88">+88 (BD)</option>
                          <option value="+1">+1 (USA)</option>
                          <option value="+91">+91 (India)</option>
                        </select>
                        <input
                          type="number"
                          formControlName="mobile"
                          placeholder="Enter your mobile number"
                          class="form-input mobile-input"
                        />
                      </div>

                      @if (accountForm.get('mobile')?.errors?.['invalidLength'] && accountForm.get('mobile')?.touched) {
                        <div class="error">Invalid number length for selected country</div>
                      }
                    }

                    @if (contactMethod() === 'email') {
                      <input
                        type="email"
                        formControlName="email"
                        placeholder="Enter your email address"
                        class="form-input"
                      />
                      @if (accountForm.get('email')?.invalid && accountForm.get('email')?.touched) {
                        <div class="error">Enter a valid email address</div>
                      }
                    }
                  </div>

                  <!-- Password -->
                  <div class="form-group">
                    <label>Password</label>
                    <input type="password" formControlName="password" placeholder="Enter your password" class="form-input" />
                    @if (accountForm.get('password')?.invalid && accountForm.get('password')?.touched) {
                      <div class="error">Password must be at least 6 characters</div>
                    }
                  </div>

                  <!-- Age -->
                  <div class="form-group">
                    <label>Age</label>
                    <input type="number" formControlName="age" placeholder="Enter your age" class="form-input" />
                    @if (accountForm.get('age')?.invalid && accountForm.get('age')?.touched) {
                      <div class="error">Please enter a valid age (minimum 18)</div>
                    }
                  </div>

                  <!-- Are You Human -->
                  <div class="form-group human-section">
                    <label>Are you human?</label>
                    <div class="human-box">
                      <span>{{ num1 }} + {{ num2 }} =</span>
                      <input
                        type="number"
                        formControlName="humanAnswer"
                        placeholder="?"
                        class="form-input small-input"
                      />
                      <button type="button" (click)="generateQuestion()" class="refresh-btn">↻</button>
                    </div>
                    @if (accountForm.get('humanAnswer')?.invalid && accountForm.get('humanAnswer')?.touched) {
                      <div class="error">Incorrect answer. Try again!</div>
                    }
                  </div>

                  <!-- Checkboxes -->
                  <div class="checkbox-group">
                    <label class="checkbox-option">
                      <input type="checkbox" formControlName="acceptTerms" class="checkbox-input" />
                      <span>I accept the Terms & Conditions</span>
                    </label>
                    <label class="checkbox-option">
                      <input type="checkbox" formControlName="jobNotifications" class="checkbox-input" />
                      <span>Receive job notifications</span>
                    </label>
                  </div>

                  <!-- Submit -->
                  <button type="submit" [disabled]="!accountForm.valid" class="submit-btn btn btn-primary btn-full">
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="sidebar-content">
            <app-sidebar />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  /* Page container */
  .page-container {
    min-height: 100vh;
    background-color: #f9fafb;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }

  /* Main container */
  .container {
    width: 100%;
    max-width: 1200px;
    padding: 0 1.5rem;
  }

  /* Grid layout */
  .content-grid {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 2rem;
  }
  @media (max-width: 992px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Form card */
  .form-card {
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    padding: 2rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .form-title {
    text-align: center;
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #111827;
  }

  /* Form inputs */
  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-size: 1rem;
  }
  .form-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    outline: none;
  }

  .error {
    font-size: 0.85rem;
    color: #ef4444;
    margin-top: 0.25rem;
  }

  /* Toggle buttons for email/mobile */
  .toggle-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  .toggle-btn {
    flex: 1;
    padding: 0.5rem 0;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    background: #f3f4f6;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }
  .toggle-btn.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
  }

  /* Mobile input group */
.mobile-input-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.country-select {
  width: 100px; /* fixed width for country code */
  padding: 0.65rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  background: #fff;
}

.mobile-input {
  flex: 1; /* take remaining space */
  padding: 0.65rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 1rem;
}

  /* Gender options */
  .gender-options {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }
  .radio-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .radio-input {
    accent-color: #2563eb;
  }

  /* Human verification */
  .human-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
  .small-input {
    width: 70px;
    text-align: center;
  }
  .refresh-btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .refresh-btn:hover {
    background: #1d4ed8;
  }

  /* Checkboxes */
  .checkbox-group {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .checkbox-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    color: #111827;
  }
  .checkbox-input {
    accent-color: #2563eb;
  }

  /* Submit button */
  .submit-btn {
    margin-top: 1.5rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    border: none;
    width: 100%;
  }
  .btn-primary {
    background: #2563eb;
    color: white;
  }
  .btn-primary:hover:not(:disabled) {
    background: #1d4ed8;
  }
`]
})
export class AccountCreationComponent {
  private fb = inject(FormBuilder);
  private registrationService = inject(RegistrationService);
  private router = inject(Router);

  contactMethod = signal<'email' | 'mobile'>('email');
  num1 = 0;
  num2 = 0;
  correctAnswer = 0;

  genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'others', label: 'Others' },
  ];

  accountForm = this.fb.group({
    name: ['', Validators.required],
    gender: ['male', Validators.required],
    email: ['', [Validators.email]],
    mobile: [''],
    countryCode: ['+88'],
    password: ['', [Validators.required, Validators.minLength(6)]],
    age: ['', [Validators.required, Validators.min(18)]],
    acceptTerms: [false, Validators.requiredTrue],
    jobNotifications: [true],
    humanAnswer: ['', Validators.required],
  });

  constructor() {
    this.generateQuestion();
  }

  generateQuestion() {
    this.num1 = Math.floor(Math.random() * 10) + 1;
    this.num2 = Math.floor(Math.random() * 10) + 1;
    this.correctAnswer = this.num1 + this.num2;
    this.accountForm.get('humanAnswer')?.reset('');
  }

  toggleContactMethod(method: 'email' | 'mobile') {
    this.contactMethod.set(method);
    if (method === 'email') {
      this.accountForm.get('email')?.setValidators([Validators.required, Validators.email]);
      this.accountForm.get('mobile')?.clearValidators();
    } else {
      this.accountForm.get('mobile')?.setValidators([Validators.required, this.mobileValidator.bind(this)]);
      this.accountForm.get('email')?.clearValidators();
    }
    this.accountForm.get('email')?.updateValueAndValidity();
    this.accountForm.get('mobile')?.updateValueAndValidity();
  }

  onCountryChange() {
    if (this.contactMethod() === 'mobile') {
      this.accountForm.get('mobile')?.updateValueAndValidity();
    }
  }

  mobileValidator(control: AbstractControl) {
  const countryCode = this.accountForm.get('countryCode')?.value || '+88'; 
  const value = control.value?.toString() || '';
  if (!value) return null;

  const lengthRules: Record<string, number> = {
    '+88': 11,
    '+1': 10,
    '+91': 10,
  };

  // type assertion to fix TS2538
  const expectedLength = lengthRules[countryCode as keyof typeof lengthRules];

  if (expectedLength && value.length !== expectedLength) {
    return { invalidLength: true };
  }

  return null;
}


  onSubmit() {
    const humanAnswer = Number(this.accountForm.get('humanAnswer')?.value);
    if (humanAnswer !== this.correctAnswer) {
      this.accountForm.get('humanAnswer')?.setErrors({ incorrect: true });
      return;
    }

    if (this.accountForm.valid) {
      this.registrationService.updateRegistrationData(this.accountForm.value as Partial<UserRegistration>);
      alert('✅ All Your Information Will Be Kepts Safe With Us!');
      this.router.navigate(['/verification']);
    }
  }
}
