import { Routes } from '@angular/router';
import { JobCategoryComponent } from './components/job-category/job-category.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { MultiStepFormComponent } from './components/multi-step-form/multi-step-form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { PurchaseOrderComponent } from './components/purchase/purchase-order.component';
import { PurchaseConfirmationComponent } from './components/purchase-confirmation/purchase-confirmation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/category', pathMatch: 'full' },
  { path: 'category', component: JobCategoryComponent },
  { path: 'account', component: AccountCreationComponent },
  { path: 'verification', component: EmailVerificationComponent },
  { path: 'multi-step', component: MultiStepFormComponent },
  { path: 'confirmation', component: ConfirmationComponent },
   { path: 'purchase-order', component: PurchaseOrderComponent },
  { path: 'purchase-confirmation', component: PurchaseConfirmationComponent },
    { path: 'purchase-order', component: PurchaseOrderComponent },
  { path: 'purchase-order', component: PurchaseOrderComponent },
  { path: '**', redirectTo: '/category' }
];