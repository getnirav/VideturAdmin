import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { CountryEntryComponent } from './masters/countries/country-entry/country-entry.component';
import { CountryListComponent } from './masters/countries/country-list/country-list.component';
import { StateEntryComponent } from './masters/states/state-entry/state-entry.component';
import { StateListComponent } from './masters/states/state-list/state-list.component';
import { CountyEntryComponent } from './masters/counties/county-entry/county-entry.component';
import { CountyListComponent } from './masters/counties/county-list/county-list.component';
import { CityEntryComponent } from './masters/cities/city-entry/city-entry.component';
import { CityListComponent } from './masters/cities/city-list/city-list.component';
import { OtherMasterListComponent } from './masters/otherMaster/other-master-list/other-master-list.component';
import { CourtEntryComponent } from './masters/courts/court-entry/court-entry.component';
import { CourtListComponent } from './masters/courts/court-list/court-list.component';
import { NotificationListComponent } from './masters/notification/notification-list/notification-list.component';
import { CaseTypePracticeAreaListComponent } from './masters/casetypepracticearea/case-type-practice-area-list/case-type-practice-area-list.component';
import { AppearanceTypeListComponent } from './masters/appearancetype/appearance-type-list/appearance-type-list.component';
import { AppearanceListComponent } from './Appearance/appearance-list/appearance-list.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { InvoiceListComponent } from './Invoice/invoice-list/invoice-list.component';
import { LatePaymentChargesListComponent } from './masters/LatePaymentCharges/late-payment-charges-list/late-payment-charges-list.component';
import { PlanPricingListComponent } from './masters/PlanPricing/plan-pricing-list/plan-pricing-list.component';
import { PaymentMethodListComponent } from './masters/PaymentMethod/payment-method-list/payment-method-list.component';
import { LoginComponent } from './User/login/login.component';
import { AuthGuard } from './services/auth-guard';
import { AdminUserListComponent } from './User/admin-user-list/admin-user-list.component';
// import { AppearanceInvoicesListComponent } from './appearance/appearance-invoices-list/appearance-invoices-list.component';
import { InvoiceReceiptListComponent } from './Invoice/invoice-receipt-list/invoice-receipt-list.component';
import { AdminUserRoleListComponent } from './User/admin-user-role-list/admin-user-role-list.component';
// import { AppearanceInvoicesListComponent } from './appearance/appearance-invoices-list/appearance-invoices-list.component';
import { ModuleActionListComponent } from './masters/ModuleAction/module-action-list/module-action-list.component';
import { ModuleMasterListComponent } from './masters/ModuleMaster/module-master-list/module-master-list.component';
import { AdminUserRolePermissionListComponent } from './masters/AdminUserRolePermission/admin-user-role-permission-list/admin-user-role-permission-list.component';
import { AppearanceInvoicesListComponent } from './appearance/appearance-invoices-list/appearance-invoices-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/countries/country-list', component: CountryListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/states/state-list', component: StateListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/counties/county-list', component: CountyListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/cities/city-list', component: CityListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/courts/court-list', component: CourtListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/otherMaster/other-master-list', component: OtherMasterListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/notification/notification-list', component: NotificationListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/casetypepracticearea/case-type-practice-area-list', component: CaseTypePracticeAreaListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/appearancetype/appearance-type-list', component: AppearanceTypeListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/latepaymentcharges/late-payment-charges-list', component: LatePaymentChargesListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/planpricing/plan-pricing-list', component: PlanPricingListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/paymentmethod/payment-method-list', component: PaymentMethodListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'appearances/appearance-list', component: AppearanceListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'users/user-list', component: UserListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'users/invoice-list', component: InvoiceListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'users/admin-user-list', component: AdminUserListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'appearances/appearance-invoices-list', component: AppearanceInvoicesListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'invoice/invoice-receipt-list', component: InvoiceReceiptListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'admin/user-role-list', component: AdminUserRoleListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/module-action-list', component: ModuleActionListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/module-master-list', component: ModuleMasterListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'masters/admin-user-role-permission-list', component: AdminUserRolePermissionListComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
