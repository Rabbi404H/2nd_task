import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-job-category',
  template: `
    <div class="job-category-page">
      <div class="container">
        <div class="page-header">
          <h1 class="page-title">Choose Your Career Path</h1>
          <p class="page-subtitle">Select the category that best describes your profession</p>
        </div>

        <div class="content-grid">
          <!-- Main Content -->
          <div class="main-content">
            <div class="categories-grid">
              @for (category of jobCategories; track category.id) {
                <div class="category-card">
                  <div class="card-content">
                    <h3 class="card-title">{{ category.title }}</h3>
                    <p class="card-description">{{ category.description }}</p>
                    
                    <div class="card-actions">
                      <button 
                        (click)="selectCategory(category)"
                        class="btn btn-primary btn-full">
                        Create Account
                      </button>
                      
                      <button class="btn btn-secondary btn-full">
                        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                          </path>
                        </svg>
                        View Tutorial
                      </button>
                    </div>
                  </div>
                </div>
              }
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
  styleUrls: ['./job-category.component.scss'],
  standalone: true,
  imports: [SidebarComponent]
})
export class JobCategoryComponent {
  private registrationService = inject(RegistrationService);
  private router = inject(Router);
  
  jobCategories = this.registrationService.getJobCategories();

  selectCategory(category: any) {
    this.registrationService.updateRegistrationData({ jobCategory: category } as any);
    this.router.navigate(['/account']);
  }
}