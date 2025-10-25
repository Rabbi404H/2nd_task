import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { CompleteRegistration, SampleUser, UserRegistration, Address } from '../../models/registration.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  template: `
    <div class="confirmation-page">
      <div class="container">
        <!-- Success Message -->
        <div class="success-section">
          <div class="success-card">
            <div class="success-icon">🎉</div>
            <h1 class="success-title">Registration Successful!</h1>
            <p class="success-message">
              Congratulations! Your account has been created successfully. 
              Welcome to our professional community.
            </p>
            <button class="btn btn-primary" (click)="goToDashboard()">
              Go to Dashboard
            </button>
          </div>
        </div>

        <!-- User Information Summary -->
        <div class="info-section">
          <h2 class="section-title">Your Information</h2>
          <div class="info-grid">
            <!-- Personal Info Card -->
            <div class="info-card">
              <h3 class="card-title">Personal Information</h3>
              <div class="info-item">
                <span class="info-label">Full Name:</span>
                <span class="info-value">{{getUserInfo('name')}}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Gender:</span>
                <span class="info-value">{{getUserInfo('gender')}}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Age:</span>
                <span class="info-value">{{getUserInfo('age')}}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Contact:</span>
                <span class="info-value">{{getContactInfo()}}</span>
              </div>
            </div>

            <!-- Address Card -->
            <div class="info-card">
              <h3 class="card-title">Address Information</h3>
              <div class="info-item">
                <span class="info-label">District:</span>
                <span class="info-value">{{getAddressInfo('district')}}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Thana:</span>
                <span class="info-value">{{getAddressInfo('thana')}}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Post Office:</span>
                <span class="info-value">{{getAddressInfo('postOffice')}}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Address:</span>
                <span class="info-value">{{getAddressInfo('address')}}</span>
              </div>
            </div>

            <!-- Skills Card -->
            <div class="info-card">
              <h3 class="card-title">Professional Skills</h3>
              <div class="skills-list">
                @if (getSelectedSkills().length > 0) {
                  @for (skill of getSelectedSkills(); track skill) {
                    <span class="skill-tag">{{skill}}</span>
                  }
                } @else {
                  <span class="no-skills">No skills selected</span>
                }
              </div>
            </div>

            <!-- Job Category Card -->
            <div class="info-card">
              <h3 class="card-title">Job Category</h3>
              <div class="info-item">
                <span class="info-label">Selected Category:</span>
                <span class="info-value category-badge">
                  {{userData.jobCategory?.title || 'N/A'}}
                </span>
              </div>
              <div class="info-item">
                <span class="info-label">Description:</span>
                <span class="info-value">
                  {{userData?.jobCategory?.description || 'N/A'}}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Users Section -->
        <div class="users-section">
          <h2 class="section-title">Recently Joined Professionals</h2>
          <p class="section-subtitle">
            Meet other professionals who recently joined our platform
          </p>
          <div class="users-grid">
            @for (user of sampleUsers; track user.id) {
              <div class="user-card">
                <div class="user-avatar">{{user.avatar}}</div>
                <div class="user-info">
                  <h4 class="user-name">{{user.name}}</h4>
                  <p class="user-profession">{{user.profession}}</p>
                  <p class="user-location">{{user.location}}</p>
                  <div class="user-skills">
                    @for (skill of user.skills; track skill) {
                      <span class="user-skill-tag">{{skill}}</span>
                    }
                  </div>
                  <p class="user-join-date">Joined {{user.joinDate}}</p>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-section">
          <button class="btn btn-secondary" (click)="editProfile()">
            Edit Profile
          </button>
          <button class="btn btn-primary" (click)="exploreJobs()">
            Explore Jobs
          </button>
          <button class="btn btn-outline" (click)="downloadProfile()">
            Download Profile
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./confirmation.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ConfirmationComponent implements OnInit {
  private registrationService = inject(RegistrationService);
  private router = inject(Router);

  userData!: CompleteRegistration;
  sampleUsers: SampleUser[] = [];

  ngOnInit() {
    this.userData = this.registrationService.getCompleteRegistrationData();
    this.sampleUsers = this.registrationService.getSampleUsers();
    
    // Complete the registration process
    this.registrationService.completeRegistration();
    
    console.log('User Data:', this.userData);
  }

  // Safe getter methods with proper typing
  getUserInfo(field: keyof UserRegistration): string {
    const value = this.userData?.userInfo?.[field];
    return value?.toString() || 'N/A';
  }

  getAddressInfo(field: keyof Address): string {
    const value = this.userData?.address?.[field];
    return value?.toString() || 'N/A';
  }

  getContactInfo(): string {
    return this.userData?.userInfo?.email || this.userData?.userInfo?.mobile || 'N/A';
  }

  getSelectedSkills(): string[] {
    if (!this.userData?.skills) return [];
    
    return this.userData.skills
      .filter(skill => skill.selected)
      .map(skill => skill.name);
  }

  goToDashboard() {
    this.router.navigate(['/category']);
  }

  editProfile() {
    this.router.navigate(['/account']);
  }

  exploreJobs() {
    alert('Explore Jobs feature coming soon!');
  }

  downloadProfile() {
    alert('Profile download feature coming soon!');
  }
}