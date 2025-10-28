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
  
  constructor(public router: Router) {}

  // Approval Workflow Steps - সবগুলো initially false
  workflowSteps = [
    {
      id: 1,
      title: 'Requisition Input',
      officer: 'Manik Ratan Sarkar, Data Coordinator',
      date: '',
      approved: false,
      rejected: false,
      active: true, // প্রথম step active
      status: 'pending',
      comment: ''
    },
    {
      id: 2,
      title: 'Requisition Checked',
      officer: 'Manik Ratan Serler, Data Coordinator',
      date: '',
      approved: false,
      rejected: false,
      active: false,
      status: 'waiting',
      comment: ''
    },
    {
      id: 3,
      title: 'Rate Proposal',
      officer: 'Huemin Muhammad Shaalf Shiluth, Jantar Sasuative',
      date: '',
      approved: false,
      rejected: false,
      active: false,
      status: 'waiting',
      comment: ''
    },
    {
      id: 4,
      title: 'Requisition Approved',
      officer: 'Min Monnar Hassain, Manager (Pre-commmit)',
      date: '',
      approved: false,
      rejected: false,
      active: false,
      status: 'waiting',
      comment: ''
    },
    {
      id: 5,
      title: 'Purchase Order',
      officer: 'Hannia Mahammad Sanrif Shihab Imitou Executive',
      date: '',
      approved: false,
      rejected: false,
      active: false,
      status: 'waiting',
      comment: ''
    },
    {
      id: 6,
      title: 'Approved By',
      officer: 'Mr Manou Hessie, Manager (Pre-commut)',
      date: '',
      approved: false,
      rejected: false,
      active: false,
      status: 'waiting',
      comment: ''
    }
  ];

  // Original data
  originalItems = [
    { sl: 1, mrfNo: '82427', materialsName: 'Adhesive Solution (2STML)', specification: '200 ml', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 3.00, rate: 494.00, disc: 27.00, rateAfterDisc: 360.62, amount: 1081.56 },
    { sl: 2, mrfNo: '83427', materialsName: 'CPVC Pipe - 3/4°', specification: 'NONE', mprNo: 'REQ-09-00414', unit: 'RH', qty: 700.00, rate: 49.00, disc: 27.01, rateAfterDisc: 36.75, amount: 25435.00 },
    { sl: 3, mrfNo: '82427', materialsName: 'CPVC Pipe - 1/4°', specification: 'NONE', mprNo: 'REQ-09-00414', unit: 'RH', qty: 350.00, rate: 27.40, disc: 27.01, rateAfterDisc: 27.30, amount: 9353.00 },
    { sl: 4, mrfNo: '82427', materialsName: 'CPVC Socket - 1°X1/2° Plain', specification: 'R. Socket', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 4.00, rate: 32.00, disc: 27.00, rateAfterDisc: 23.36, amount: 93.44 },
    { sl: 5, mrfNo: '82427', materialsName: 'CPVC Socket - 1/2°X3/4° Plain', specification: 'R. Socket', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 30.00, rate: 25.00, disc: 27.00, rateAfterDisc: 20.44, amount: 613.20 },
    { sl: 6, mrfNo: '82427', materialsName: 'CPVC Elbow - 3/4° Plain', specification: 'NONE', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 100.00, rate: 20.00, disc: 27.00, rateAfterDisc: 14.80, amount: 1400.00 },
    { sl: 7, mrfNo: '82427', materialsName: 'CPVC Elbow - 1/2° Female', specification: 'NONE', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 40.00, rate: 106.00, disc: 27.00, rateAfterDisc: 77.35, amount: 3095.20 },
    { sl: 8, mrfNo: '82427', materialsName: 'CPVC Elbow - 1/2°X3/4° Plain', specification: 'NONE', mprNo: 'REQ-09-00414', unit: 'NOS', qty: 30.00, rate: 33.00, disc: 27.00, rateAfterDisc: 23.36, amount: 700.50 }
  ];

  // Displayed items
  items: any[] = [];
  
  // Search and Filter properties
  searchText: string = '';
  selectedUnit: string = '';
  selectedMaterial: string = '';
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  // Unique values for filters
  units: string[] = [];
  materials: string[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  // Dropdown state
  showSortDropdown: boolean = false;

  // Modal state
  showCommentModal: boolean = false;
  selectedStep: any;
  commentText: string = '';

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.items = [...this.originalItems];
    this.units = [...new Set(this.originalItems.map(item => item.unit))];
    this.materials = [...new Set(this.originalItems.map(item => item.materialsName))];
    this.calculateTotalPages();
  }

  // Search functionality
  onSearch() {
    this.applyFilters();
  }

  // Filter functionality
  applyFilters() {
    let filteredItems = [...this.originalItems];

    // Apply search filter
    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        Object.values(item).some(val =>
          val.toString().toLowerCase().includes(searchLower)
        )
      );
    }

    // Apply unit filter
    if (this.selectedUnit) {
      filteredItems = filteredItems.filter(item => item.unit === this.selectedUnit);
    }

    // Apply material filter
    if (this.selectedMaterial) {
      filteredItems = filteredItems.filter(item => item.materialsName === this.selectedMaterial);
    }

    this.items = filteredItems;
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  // Clear all filters
  clearFilters() {
    this.searchText = '';
    this.selectedUnit = '';
    this.selectedMaterial = '';
    this.sortField = '';
    this.sortDirection = 'asc';
    this.items = [...this.originalItems];
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  // Sort functionality
  sortTable(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.items.sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.showSortDropdown = false;
  }

  // Get sort icon
  getSortIcon(field: string): string {
    if (this.sortField !== field) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  // Pagination methods
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
  }

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.items.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Get page numbers for pagination
  get pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Totals calculation
  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + item.amount, 0);
  }

  get totalAmount(): number {
    return this.subtotal;
  }

  // Format currency
  formatCurrency(value: number): string {
    return 'BDT ' + value.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Toggle sort dropdown
  toggleSortDropdown() {
    this.showSortDropdown = !this.showSortDropdown;
  }

  // Workflow status counting methods
  getApprovedCount(): number {
    return this.workflowSteps.filter(step => step.approved).length;
  }

  getPendingCount(): number {
    return this.workflowSteps.filter(step => step.active && !step.approved && !step.rejected).length;
  }

  getRejectedCount(): number {
    return this.workflowSteps.filter(step => step.rejected).length;
  }

  getWaitingCount(): number {
    return this.workflowSteps.filter(step => 
      !step.approved && !step.rejected && !step.active && step.status === 'waiting'
    ).length;
  }

  // Approval Workflow Methods
  openStep(step: any) {
    // শুধুমাত্র active step বা approved steps কে open করতে দিবে
    if (step.active || step.approved || step.rejected) {
      this.selectedStep = step;
      this.showCommentModal = true;
      this.commentText = step.comment || '';
    }
  }

  approveStep() {
    if (this.selectedStep) {
      this.selectedStep.approved = true;
      this.selectedStep.rejected = false;
      this.selectedStep.active = false;
      this.selectedStep.status = 'approved';
      this.selectedStep.comment = this.commentText;
      this.selectedStep.date = this.getCurrentDate();
      
      // Next step কে active করবো
      this.activateNextStep(this.selectedStep.id);
      
      this.closeModal();
    }
  }

  rejectStep() {
    if (this.selectedStep) {
      this.selectedStep.approved = false;
      this.selectedStep.rejected = true;
      this.selectedStep.active = false;
      this.selectedStep.status = 'rejected';
      this.selectedStep.comment = this.commentText;
      this.selectedStep.date = this.getCurrentDate();
      
      // Reject করলে পরের steps গুলো inactive থাকবে
      this.deactivateFollowingSteps(this.selectedStep.id);
      
      this.closeModal();
    }
  }

  // পরের step কে active করা
  activateNextStep(currentStepId: number) {
    const nextStep = this.workflowSteps.find(step => step.id === currentStepId + 1);
    if (nextStep && !nextStep.approved && !nextStep.rejected) {
      nextStep.active = true;
      nextStep.status = 'pending';
    }
  }

  // Reject করলে পরের steps গুলো inactive করা
  deactivateFollowingSteps(rejectedStepId: number) {
    this.workflowSteps.forEach(step => {
      if (step.id > rejectedStepId) {
        step.active = false;
        step.status = 'waiting';
        step.approved = false;
        step.rejected = false;
        step.date = '';
        step.comment = '';
      }
    });
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

  // Check if all steps are approved
  areAllStepsApproved(): boolean {
    return this.workflowSteps.every(step => step.approved);
  }

  // Check if any step is rejected
  isAnyStepRejected(): boolean {
    return this.workflowSteps.some(step => step.rejected);
  }

  // Get status badge class
  getStatusClass(status: string): string {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      case 'waiting': return 'status-waiting';
      default: return 'status-default';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'approved': return 'Approved';
      case 'pending': return 'Pending Approval';
      case 'rejected': return 'Rejected';
      case 'waiting': return 'Waiting';
      default: return status;
    }
  }

  // Get step signal color
  getStepSignal(step: any): string {
    if (step.approved) return 'signal-green';
    if (step.rejected) return 'signal-red';
    if (step.active) return 'signal-orange';
    return 'signal-gray';
  }

  // Get step signal text
  getStepSignalText(step: any): string {
    if (step.approved) return '✓';
    if (step.rejected) return '✗';
    if (step.active) return '⟳';
    return '⋯';
  }

  // Navigation methods
  confirmPurchase() {
    if (this.areAllStepsApproved()) {
      alert('Purchase Confirmed Successfully!');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Please complete all approval steps before confirming purchase.');
    }
  }

  printPage() {
    window.print();
  }

  goBackToOrder() {
    this.router.navigate(['/purchase-order']);
  }
}