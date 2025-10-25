import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { WorkingSkill } from '../../models/registration.model';

@Component({
  selector: 'app-multi-step-form',
  template: `
    <div class="multi-step-page">
      <div class="container">
        <!-- Progress Bar -->
        <div class="progress-section">
          <div class="progress-header">
            <span class="progress-text">Step {{ currentStep() }} of 3</span>
            <span class="progress-percentage">{{ getProgressPercentage() }}%</span>
          </div>
          <div class="progress-bar">
            <div 
              class="progress-fill"
              [style.width]="getProgressPercentage() + '%'">
            </div>
          </div>
        </div>

        <!-- Step Content -->
        <div class="step-card">
          <div class="step-content">
            <!-- Step 1: Present Address -->
            @if (currentStep() === 1) {
              <div class="step-panel">
                <h2 class="step-title">Present Address</h2>
                
                <form [formGroup]="addressForm" (ngSubmit)="nextStep()">
                  <div class="form-grid">
                    <!-- District -->
                    <div class="form-group">
                      <label for="district">District</label>
                      <select
                        id="district"
                        formControlName="district"
                        (change)="onDistrictChange()">
                        <option value="">Select District</option>
                        @for (district of districts; track district) {
                          <option [value]="district">{{ district }}</option>
                        }
                      </select>
                    </div>

                    <!-- Thana/Upazila -->
                    <div class="form-group">
                      <label for="thana">Thana/Upazila</label>
                      <select
                        id="thana"
                        formControlName="thana"
                        [disabled]="!addressForm.get('district')?.value">
                        <option value="">Select Thana</option>
                        @for (thana of thanas(); track thana) {
                          <option [value]="thana">{{ thana }}</option>
                        }
                      </select>
                    </div>

                    <!-- Post Office -->
                    <div class="form-group">
                      <label for="postOffice">Post Office</label>
                      <select
                        id="postOffice"
                        formControlName="postOffice">
                        <option value="">Select Post Office</option>
                        <option value="Post Office 1">Post Office 1</option>
                        <option value="Post Office 2">Post Office 2</option>
                      </select>
                    </div>

                    <!-- Alternate Mobile -->
                    <div class="form-group">
                      <label for="alternateMobile">Alternate Mobile Number</label>
                      <input
                        id="alternateMobile"
                        type="tel"
                        formControlName="alternateMobile"
                        placeholder="Optional">
                    </div>

                    <!-- House/Road/Village -->
                    <div class="form-group full-width">
                      <label for="address">House/Road/Village</label>
                      <textarea
                        id="address"
                        formControlName="address"
                        rows="3"
                        placeholder="Enter your detailed address"></textarea>
                    </div>
                  </div>

                  <div class="step-actions">
                    <button
                      type="submit"
                      [disabled]="!addressForm.valid"
                      class="btn btn-primary next-btn">
                      Next
                    </button>
                  </div>
                </form>
              </div>
            }

            <!-- Step 2: Age -->
            @if (currentStep() === 2) {
              <div class="step-panel">
                <h2 class="step-title">Age Information</h2>
                
                <form [formGroup]="ageForm" (ngSubmit)="nextStep()">
                  <div class="age-form">
                    <div class="form-group">
                      <label for="age">Your Age</label>
                      <input
                        id="age"
                        type="number"
                        formControlName="age"
                        placeholder="Enter your age">
                      @if (ageForm.get('age')?.invalid && ageForm.get('age')?.touched) {
                        <div class="error">Please enter a valid age (18-65)</div>
                      }
                    </div>
                  </div>

                  <div class="step-actions">
                    <button
                      type="button"
                      (click)="previousStep()"
                      class="btn btn-secondary back-btn">
                      Back
                    </button>
                    <button
                      type="submit"
                      [disabled]="!ageForm.valid"
                      class="btn btn-primary next-btn">
                      Next
                    </button>
                  </div>
                </form>
              </div>
            }

            <!-- Step 3: Working Skills -->
            @if (currentStep() === 3) {
              <div class="step-panel">
                <h2 class="step-title">Working Skills</h2>
                
                <form [formGroup]="skillsForm" (ngSubmit)="onSubmit()">
                  <div class="skills-section">
                    <p class="skills-description">Select your skills from the list below:</p>
                    <div class="skills-grid">
                      @for (skill of skills(); track skill.id) {
                        <label class="skill-option">
                          <input
                            type="checkbox"
                            [checked]="skill.selected"
                            (change)="toggleSkill(skill)">
                          <span class="skill-text">{{ skill.name }}</span>
                        </label>
                      }
                    </div>
                  </div>

                  <div class="step-actions">
                    <button
                      type="button"
                      (click)="previousStep()"
                      class="btn btn-secondary back-btn">
                      Back
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary submit-btn">
                      Complete Registration
                    </button>
                  </div>
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./multi-step-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class MultiStepFormComponent {
  private fb = inject(FormBuilder);
  private registrationService = inject(RegistrationService);
  private router = inject(Router);

  currentStep = signal(1);
  thanas = signal<string[]>([]);
  skills = signal(this.registrationService.getSkills());
  
  districts = this.registrationService.getDistricts();

  addressForm = this.fb.group({
    district: ['', Validators.required],
    thana: ['', Validators.required],
    postOffice: ['', Validators.required],
    address: ['', Validators.required],
    alternateMobile: ['']
  });

  ageForm = this.fb.group({
    age: ['', [Validators.required, Validators.min(18), Validators.max(65)]]
  });

  skillsForm = this.fb.group({});

  onDistrictChange() {
    const district = this.addressForm.get('district')?.value;
    if (district) {
      this.thanas.set(this.registrationService.getThanas(district));
      this.addressForm.get('thana')?.enable();
    } else {
      this.thanas.set([]);
      this.addressForm.get('thana')?.disable();
    }
  }

  toggleSkill(skill: WorkingSkill) {
    skill.selected = !skill.selected;
    this.skills.update(skills => [...skills]);
  }

  nextStep() {
    if (this.currentStep() < 3) {
      this.currentStep.update(step => step + 1);
    }
  }

  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(step => step - 1);
    }
  }

  getProgressPercentage(): number {
    return (this.currentStep() / 3) * 100;
  }

  onSubmit() {
    const selectedSkills = this.skills().filter(skill => skill.selected);
    this.registrationService.updateRegistrationData({
      skills: selectedSkills,
      ...this.addressForm.value,
      ...this.ageForm.value
    });

    // Complete registration and navigate to confirmation
    console.log('Registration completed:', this.registrationService.getCurrentData());
    this.router.navigate(['/confirmation']);
  }
}