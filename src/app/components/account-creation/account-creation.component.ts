import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserRegistration } from '../../models/registration.model';

@Component({
  selector: 'app-account-creation',
  template: `
    <div class="page-container">
      <div class="container">
        <div class="content-grid">
          <!-- Main Content -->
          <div class="main-content">
            <div class="form-card">
              <h2 class="form-title">Create Your Account</h2>
              
              <form [formGroup]="accountForm" (ngSubmit)="onSubmit()">
                <div class="form-content">
                  <!-- Name -->
                  <div class="form-group">
                    <label for="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      formControlName="name"
                      placeholder="Enter your full name"
                      class="form-input">
                    @if (accountForm.get('name')?.invalid && accountForm.get('name')?.touched) {
                      <div class="error">Name is required</div>
                    }
                  </div>

                  <!-- Gender -->
                  <div class="form-group">
                    <label class="form-label">Gender</label>
                    <div class="gender-options">
                      @for (gender of genders; track gender.value) {
                        <label class="radio-option">
                          <input
                            type="radio"
                            formControlName="gender"
                            [value]="gender.value"
                            class="radio-input">
                          <span class="radio-text">{{ gender.label }}</span>
                        </label>
                      }
                    </div>
                  </div>

                  <!-- Email/Mobile Toggle -->
                  <div class="form-group">
                    <label class="form-label">Contact Method</label>
                    <div class="toggle-buttons">
                      <button
                        type="button"
                        (click)="toggleContactMethod('email')"
                        [class.active]="contactMethod() === 'email'"
                        class="toggle-btn">
                        Email
                      </button>
                      <button
                        type="button"
                        (click)="toggleContactMethod('mobile')"
                        [class.active]="contactMethod() === 'mobile'"
                        class="toggle-btn">
                        Mobile
                      </button>
                    </div>

                    @if (contactMethod() === 'mobile') {
                      <div class="mobile-input-group">
                        <select formControlName="countryCode" class="country-select">
                          <option value="+88">+88</option>
                          <option value="+1">+1</option>
                          <option value="+91">+91</option>
                        </select>
                        <input
                          type="tel"
                          formControlName="mobile"
                          placeholder="Enter your mobile number"
                          class="form-input mobile-input">
                      </div>
                    }

                    @if (contactMethod() === 'email') {
                      <input
                        type="email"
                        formControlName="email"
                        placeholder="Enter your email address"
                        class="form-input">
                    }
                  </div>

                  <!-- Password -->
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      formControlName="password"
                      placeholder="Create a password"
                      class="form-input">
                    @if (accountForm.get('password')?.invalid && accountForm.get('password')?.touched) {
                      <div class="error">Password must be at least 6 characters</div>
                    }
                  </div>

                  <!-- Age -->
                  <div class="form-group">
                    <label for="age">Age</label>
                    <input
                      id="age"
                      type="number"
                      formControlName="age"
                      placeholder="Enter your age"
                      class="form-input">
                    @if (accountForm.get('age')?.invalid && accountForm.get('age')?.touched) {
                      <div class="error">Please enter a valid age (minimum 18)</div>
                    }
                  </div>

                  <!-- Checkboxes -->
                  <div class="checkbox-group">
                    <label class="checkbox-option">
                      <input type="checkbox" formControlName="acceptTerms" class="checkbox-input">
                      <span class="checkbox-text">I accept the Terms & Conditions</span>
                    </label>
                    <label class="checkbox-option">
                      <input type="checkbox" formControlName="jobNotifications" class="checkbox-input">
                      <span class="checkbox-text">Send me job notifications and updates</span>
                    </label>
                  </div>

                  <!-- Submit Button -->
                  <button
                    type="submit"
                    [disabled]="!accountForm.valid"
                    class="submit-btn btn btn-primary btn-full">
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="sidebar-content">
            <app-sidebar />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background-color: #f9fafb;
      padding: 2rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 1024px) {
      .content-grid {
        grid-template-columns: 3fr 1fr;
      }
    }

    .form-card {
      background-color: white;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      padding: 2rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    .form-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .form-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      margin-bottom: 0;
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: all 0.2s;
      background-color: white;
    }

    .form-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .gender-options {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }

    .radio-option {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .radio-option:hover {
      border-color: #9ca3af;
    }

    .radio-input {
      margin-right: 0.5rem;
    }

    .radio-text {
      font-size: 0.875rem;
      color: #374151;
    }

    .toggle-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .toggle-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background-color: white;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.875rem;
    }

    .toggle-btn.active {
      background-color: #2563eb;
      color: white;
      border-color: #2563eb;
    }

    .toggle-btn:hover:not(.active) {
      border-color: #9ca3af;
    }

    .mobile-input-group {
      display: flex;
      gap: 0.75rem;
    }

    .country-select {
      width: 6rem;
      flex-shrink: 0;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      background-color: white;
    }

    .mobile-input {
      flex: 1;
    }

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .checkbox-option {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .checkbox-input {
      margin-right: 0.75rem;
    }

    .checkbox-text {
      font-size: 0.875rem;
      color: #374151;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      text-decoration: none;
      font-size: 0.875rem;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: #2563eb;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #1d4ed8;
    }

    .btn-full {
      width: 100%;
    }

    .submit-btn {
      margin-top: 1rem;
      padding: 0.875rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .error {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem 0;
      }
      
      .form-card {
        padding: 1.5rem;
      }
      
      .gender-options {
        grid-template-columns: 1fr;
      }
      
      .mobile-input-group {
        flex-direction: column;
      }
      
      .country-select {
        width: 100%;
      }
    }
  `],
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent]
})
export class AccountCreationComponent {
  private fb = inject(FormBuilder);
  private registrationService = inject(RegistrationService);
  private router = inject(Router);

  // Properties that were missing
  contactMethod = signal<'email' | 'mobile'>('email');
  
  genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'others', label: 'Others' }
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
    jobNotifications: [true]
  });

  // Methods that were missing
  toggleContactMethod(method: 'email' | 'mobile') {
    this.contactMethod.set(method);
    if (method === 'email') {
      this.accountForm.get('email')?.setValidators([Validators.required, Validators.email]);
      this.accountForm.get('mobile')?.clearValidators();
    } else {
      this.accountForm.get('mobile')?.setValidators([Validators.required]);
      this.accountForm.get('email')?.clearValidators();
    }
    this.accountForm.get('email')?.updateValueAndValidity();
    this.accountForm.get('mobile')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.registrationService.updateRegistrationData(this.accountForm.value as Partial<UserRegistration>);
      this.router.navigate(['/verification']);
    }
  }
}