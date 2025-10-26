import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-category',
  templateUrl: './job-category.component.html',
  styleUrls: ['./job-category.component.scss'],
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class JobCategoryComponent {
  private registrationService = inject(RegistrationService);
  private router = inject(Router);

  jobCategories = this.registrationService.getJobCategories();
  sampleUsers = this.registrationService.getSampleUsers();

  // === LOGIN ===
  showLoginModal = false;
  loginEmail = '';
  loginPassword = '';
  logging = false;

  // === FORGOT PASSWORD ===
  showForgotModal = false;
  forgotStep = 1;
  forgotEmail = '';
  verificationCode = '';
  enteredCode = '';
  newPassword = '';
  activeForgotUser: any = null;

  // === TOAST ===
  toastMessage = '';
  toastType: 'success' | 'error' | '' = '';

  // === CATEGORY SELECT ===
  selectCategory(category: any) {
    this.registrationService.updateRegistrationData({ jobCategory: category } as any);
    this.router.navigate(['/account']);
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  // === LOGIN ===
  openLogin() {
    this.showLoginModal = true;
    this.clearLoginFields();
  }

  closeLogin() {
    this.showLoginModal = false;
    this.clearToast();
  }

  clearLoginFields() {
    this.loginEmail = '';
    this.loginPassword = '';
    this.logging = false;
  }

  login() {
    if (!this.loginEmail || !this.loginPassword) {
      this.showToast('Please enter email and password', 'error');
      return;
    }

    this.logging = true;

    setTimeout(() => {
      const matched = this.sampleUsers.find(
        (u) =>
          u.email.toLowerCase() === this.loginEmail.toLowerCase() &&
          u.password === this.loginPassword
      );

      if (matched) {
        sessionStorage.setItem('loggedUser', JSON.stringify(matched));
        this.showToast('Login successful ✅', 'success');
        setTimeout(() => this.closeLogin(), 800);
      } else {
        this.showToast('Login failed — email or password incorrect ❌', 'error');
      }

      this.logging = false;
    }, 600);
  }

  // === FORGOT PASSWORD ===
  openForgotPassword() {
    this.showForgotModal = true;
    this.forgotStep = 1;
    this.forgotEmail = '';
    this.enteredCode = '';
    this.newPassword = '';
    this.activeForgotUser = null;
    this.verificationCode = '';
  }

  closeForgotModal() {
    this.showForgotModal = false;
  }

  submitForgotStep() {
    // STEP 1: Verify email and "send" code (we still generate one for display simulation)
    if (this.forgotStep === 1) {
      const user = this.sampleUsers.find(
        (u) => u.email.toLowerCase() === this.forgotEmail.toLowerCase()
      );
      if (!user) {
        this.showToast('Email not found ❌', 'error');
        return;
      }

      this.activeForgotUser = user;
      this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      this.showToast(`(Sim) Verification code: ${this.verificationCode}`, 'success');

      this.forgotStep = 2;
      return;
    }

    // STEP 2: Accept any valid 6-digit code (no strict match to generated code)
    if (this.forgotStep === 2) {
      const code = this.enteredCode.trim();
      const sixDigitPattern = /^\d{6}$/;

      if (!sixDigitPattern.test(code)) {
        this.showToast('Please enter a valid 6-digit code ❌', 'error');
        return;
      }

      // Accept the code even if it doesn't match the generated one (practice mode)
      this.showToast('Code accepted (practice mode) ✅', 'success');
      this.forgotStep = 3;
      return;
    }

    // STEP 3: Set new password
    if (this.forgotStep === 3) {
      if (!this.newPassword) {
        this.showToast('Please enter new password', 'error');
        return;
      }

      if (this.activeForgotUser) {
        this.activeForgotUser.password = this.newPassword;
        this.showToast('Password reset successfully ✅', 'success');
        this.closeForgotModal();
      } else {
        this.showToast('Something went wrong ❌', 'error');
      }
    }
  }

  // === TOAST ===
  showToast(msg: string, type: 'success' | 'error') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => this.clearToast(), 3000);
  }

  clearToast() {
    this.toastMessage = '';
    this.toastType = '';
  }
}
