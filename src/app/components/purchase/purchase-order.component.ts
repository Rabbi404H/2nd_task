import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {
  
  constructor(private router: Router) {}

  purchaseData = {
    poNumber: '',
    poDate: '',
    supplierName: '',
    supplierAddress: '',
    phoneNumber: '',
    supplierContact: '',
    subject: 'purchase',
    projectName: '',
    projectAddress: '',
    contactPerson: '',
    items: [
      { slNo: 1, description: '', quantity: 0, unit: '', rate: 0, amount: 0 }
    ]
  };

  subjectOptions = [
    { value: 'purchase', label: 'Purchase Order for Construction Materials' },
    { value: 'electrical', label: 'Purchase Order for Electrical Items' },
    { value: 'plumbing', label: 'Purchase Order for Plumbing Materials' },
    { value: 'finishing', label: 'Purchase Order for Finishing Materials' }
  ];

  ngOnInit() {
    this.generatePONumber();
    this.setCurrentDate();
  }

  generatePONumber() {
    const randomNum = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    this.purchaseData.poNumber = `POR${year}-${month}-${randomNum}`;
  }

  setCurrentDate() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    this.purchaseData.poDate = `${day}-${month}-${year}`;
  }

  addItem() {
    const newSlNo = this.purchaseData.items.length + 1;
    this.purchaseData.items.push({
      slNo: newSlNo,
      description: '',
      quantity: 0,
      unit: '',
      rate: 0,
      amount: 0
    });
  }

  removeItem(index: number) {
    if (this.purchaseData.items.length > 1) {
      this.purchaseData.items.splice(index, 1);
      // Recalculate serial numbers
      this.purchaseData.items.forEach((item, i) => {
        item.slNo = i + 1;
      });
    }
  }

  calculateAmount(item: any) {
    item.amount = item.quantity * item.rate;
  }

  getTotalAmount(): number {
    return this.purchaseData.items.reduce((total, item) => total + item.amount, 0);
  }

  submitPurchaseOrder() {
    // Validate form before submission
    if (this.validateForm()) {
      console.log('Purchase Order Submitted:', this.purchaseData);
      
      // Navigate to confirmation page with data
      this.router.navigate(['/purchase-confirmation'], { 
        state: { purchaseData: this.purchaseData } 
      });
    }
  }

  private validateForm(): boolean {
    // Check if supplier name is filled
    if (!this.purchaseData.supplierName.trim()) {
      alert('Please enter Supplier Name');
      return false;
    }

    // Check if at least one item has description
    const hasValidItems = this.purchaseData.items.some(item => 
      item.description.trim() && item.quantity > 0 && item.rate > 0
    );

    if (!hasValidItems) {
      alert('Please add at least one item with description, quantity and rate');
      return false;
    }

    return true;
  }

  printForm() {
    window.print();
  }

  goBack() {
    this.router.navigate(['/confirmation']);
  }
}