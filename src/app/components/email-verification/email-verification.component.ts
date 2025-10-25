import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoBox } from '../../models/registration.model';

@Component({
  selector: 'app-email-verification',
  template: `
    <div class="verification-page">
      <div class="container">
        <div class="content-grid">
          <!-- Main Content -->
          <div class="main-content">
            <div class="verification-card">
              <h2 class="verification-title">Registration with Email Address</h2>
              <p class="verification-subtitle">
                We've sent a verification code to <span class="email-highlight">user@example.com</span>
              </p>
              
              <form [formGroup]="verificationForm" (ngSubmit)="onSubmit()">
                <div class="verification-content">
                  <!-- Verification Code -->
                  <div class="form-group">
                    <label for="code">Verification Code</label>
                    <input
                      id="code"
                      type="text"
                      formControlName="code"
                      placeholder="Enter 6-digit code"
                      maxlength="6">
                    @if (verificationForm.get('code')?.invalid && verificationForm.get('code')?.touched) {
                      <div class="error">Verification code is required (6 digits)</div>
                    }
                  </div>

                  <!-- Submit Button -->
                  <button
                    type="submit"
                    [disabled]="!verificationForm.valid"
                    class="btn btn-primary btn-full verify-btn">
                    Next
                  </button>

                  <!-- Resend Code -->
                  <div class="resend-section">
                    <button type="button" class="resend-btn">
                      Resend Verification Code
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="sidebar-content">
            <div class="info-sidebar">
              <!-- Info Boxes -->
              <div class="info-boxes">
                @for (info of infoBoxes; track info.title) {
                  <div class="info-box">
                    <h4 class="info-title">{{ info.title }}</h4>
                    <p class="info-description">{{ info.description }}</p>
                  </div>
                }
              </div>

              <!-- Help Section -->
              <div class="help-section">
                <h3 class="help-title">Need Help?</h3>
                <div class="contact-info">
                  <div class="contact-item">
                    <svg class="contact-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                    <span>+880 1234-567890</span>
                  </div>
                  <div class="contact-item">
                    <svg class="contact-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    <span>support@jobportal.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./email-verification.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class EmailVerificationComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  infoBoxes: InfoBox[] = [
    { title: 'Job Notifications', description: 'Get instant alerts for matching jobs' },
    { title: 'Mobile Access', description: 'Access your account from any device' },
    { title: 'Employer Messages', description: 'Direct communication with employers' },
    { title: 'Company Stats', description: 'Track your application progress' }
  ];

  verificationForm = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  onSubmit() {
    if (this.verificationForm.valid) {
      this.router.navigate(['/multi-step']);
    }
  }
}