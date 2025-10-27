import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-confirmation.component.html',
  styleUrls: ['./purchase-confirmation.component.scss']
})
export class PurchaseConfirmationComponent implements OnInit {
  // Make router public instead of private
  constructor(public router: Router) {}

  workflowSteps = [
    {
      id: 1,
      title: 'Requisition Input',
      officer: 'Manik Ratan Sarkar, Data Coordinator',
      date: '16-Sep-2025',
      approved: false, // Start with false
      active: true, // First step active
      comment: ''
    },
    {
      id: 2,
      title: 'Requisition Checked',
      officer: 'Manik Ratan Serler, Data Coordinator',
      date: '',
      approved: false,
      active: false,
      comment: ''
    },
    {
      id: 3,
      title: 'Rate Proposal',
      officer: 'Huemin Muhammad Shaalf Shiluth, Jantar Sasuative',
      date: '',
      approved: false,
      active: false,
      comment: ''
    },
    {
      id: 4,
      title: 'Requisition Approved',
      officer: 'Min Monnar Hassain, Manager (Pre-commmit)',
      date: '',
      approved: false,
      active: false,
      comment: ''
    },
    {
      id: 5,
      title: 'Purchase Order',
      officer: 'Hannia Mahammad Sanrif Shihab Imitou Executive',
      date: '',
      approved: false,
      active: false,
      comment: ''
    },
    {
      id: 6,
      title: 'Approved By',
      officer: 'Mr Manou Hessie, Manager (Pre-commut)',
      date: '',
      approved: false,
      active: false,
      comment: ''
    }
  ];

  currentStep: number = 1;
  showCommentModal: boolean = false;
  selectedStep: any;
  commentText: string = '';
  allStepsApproved: boolean = false;

  // Sample data from image
  items = [
    { sl: 1, mrfNo: '82427', materialsName: 'Adhesive Solution (2STML)', specification: '200 ml', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 3.00, rate: 494.00, disc: 27.00, rateAfterDisc: 360.62, amount: 1081.56 },
    { sl: 2, mrfNo: '83427', materialsName: 'CPVC Pipe - 3/4°', specification: 'NONE', mprNo: 'REQ-09-00414', unit: 'RH', qty: 700.00, rate: 49.00, disc: 27.01, rateAfterDisc: 36.75, amount: 25435.00 },
    { sl: 3, mrfNo: '82427', materialsName: 'CPVC Pipe - 1/4°', specification: 'NONE', mprNo: 'REQ-09-00414', unit: 'RH', qty: 350.00, rate: 27.40, disc: 27.01, rateAfterDisc: 27.30, amount: 9353.00 },
    { sl: 4, mrfNo: '82427', materialsName: 'CPVC Socket - 1°X1/2° Plain', specification: 'R. Socket', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 4.00, rate: 32.00, disc: 27.00, rateAfterDisc: 23.36, amount: 93.44 },
    { sl: 5, mrfNo: '82427', materialsName: 'CPVC Socket - 1/2°X3/4° Plain', specification: 'R. Socket', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 30.00, rate: 25.00, disc: 27.00, rateAfterDisc: 20.44, amount: 613.20 },
    { sl: 6, mrfNo: '82427', materialsName: 'CPVC Elbow - 3/4° Plain', specification: 'NONE', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 100.00, rate: 20.00, disc: 27.00, rateAfterDisc: 14.80, amount: 1400.00 },
    { sl: 7, mrfNo: '82427', materialsName: 'CPVC Elbow - 1/2° Female', specification: 'NONE', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 40.00, rate: 106.00, disc: 27.00, rateAfterDisc: 77.35, amount: 3095.20 },
    { sl: 8, mrfNo: '82427', materialsName: 'CPVC Elbow - 1/2°X3/4° Plain', specification: 'NONE', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 30.00, rate: 33.00, disc: 27.00, rateAfterDisc: 23.36, amount: 700.50 }
  ];

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + item.amount, 0);
  }

  get totalAmount(): number {
    return this.subtotal;
  }

  ngOnInit() {
    this.initializeWorkflow();
  }

  initializeWorkflow() {
    this.workflowSteps.forEach(step => {
      step.active = step.id === this.currentStep;
    });
  }

  openStep(step: any) {
    if (step.approved || step.id === this.currentStep) {
      this.selectedStep = step;
      this.showCommentModal = true;
      this.commentText = step.comment || '';
    }
  }

  approveStep() {
    if (this.selectedStep) {
      this.selectedStep.approved = true;
      this.selectedStep.comment = this.commentText;
      this.selectedStep.date = this.getCurrentDate();
      
      // Move to next step
      if (this.currentStep < 6) {
        this.currentStep++;
        this.workflowSteps.forEach(step => {
          step.active = step.id === this.currentStep;
        });
      } else {
        // All steps completed
        this.allStepsApproved = true;
      }
      
      this.closeModal();
    }
  }

  rejectStep() {
    if (this.selectedStep) {
      this.selectedStep.approved = false;
      this.selectedStep.comment = this.commentText;
      this.closeModal();
    }
  }

  closeModal() {
    this.showCommentModal = false;
    this.selectedStep = null;
    this.commentText = '';
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  confirmPurchase() {
    alert('Purchase Confirmed Successfully!');
    this.router.navigate(['/dashboard']);
  }

  printPage() {
    window.print();
  }

  // Add this method to handle back navigation
  goBackToOrder() {
    this.router.navigate(['/purchase-order']);
  }

  // Check if all steps are approved
  areAllStepsApproved(): boolean {
    return this.workflowSteps.every(step => step.approved);
  }
}