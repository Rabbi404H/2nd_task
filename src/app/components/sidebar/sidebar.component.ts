import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <div class="sidebar">
      <!-- Benefits Section -->
      <div class="sidebar-section">
        <h3 class="sidebar-title">Benefits</h3>
        <div class="benefits-list">
          @for (benefit of benefits; track $index) {
            <div class="benefit-item">
              <svg class="benefit-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="benefit-text">{{ benefit }}</span>
            </div>
          }
        </div>
      </div>

      <!-- Help Section -->
      <div class="sidebar-help">
        <h3 class="sidebar-title">Need Help?</h3>
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
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() benefits: string[] = [
    'Get job notifications matching your skills',
    'Receive messages from employers directly',
    'Access to exclusive job opportunities',
    'Career guidance and tips',
    'Profile visibility to top companies'
  ];
}
