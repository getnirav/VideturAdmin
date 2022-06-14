import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './Home/Home.component';
import { CountyListComponent } from './masters/counties/county-list/county-list.component';
import { CountryEntryComponent } from './masters/countries/country-entry/country-entry.component';
import { StateListComponent } from './masters/states/state-list/state-list.component';
import { StateEntryComponent } from './masters/states/state-entry/state-entry.component';
import { CountyEntryComponent } from './masters/counties/county-entry/county-entry.component';
import { CityListComponent } from './masters/cities/city-list/city-list.component';
import { CityEntryComponent } from './masters/cities/city-entry/city-entry.component';
import { CountryListComponent } from './masters/countries/country-list/country-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtherMasterListComponent } from './masters/otherMaster/other-master-list/other-master-list.component';
import { OtherMasterEntryComponent } from './masters/otherMaster/other-master-entry/other-master-entry.component';
import { CourtListComponent } from './masters/courts/court-list/court-list.component';
import { CourtEntryComponent } from './masters/courts/court-entry/court-entry.component';
import { NotificationListComponent } from './masters/notification/notification-list/notification-list.component';
import { NotificationEntryComponent } from './masters/notification/notification-entry/notification-entry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SpinnerInterceptor } from './Common/spinner.interceptor';
import { SpinnerOverlayComponent } from './Common/spinner-overlay/spinner-overlay.component';
import { CaseTypePracticeAreaListComponent } from './masters/casetypepracticearea/case-type-practice-area-list/case-type-practice-area-list.component';
import { CaseTypePracticeAreaEntryComponent } from './masters/casetypepracticearea/case-type-practice-area-entry/case-type-practice-area-entry.component';
import { AppearanceTypeListComponent } from './masters/appearancetype/appearance-type-list/appearance-type-list.component';
import { AppearanceTypeEntryComponent } from './masters/appearancetype/appearance-type-entry/appearance-type-entry.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserListComponent } from './User/user-list/user-list.component';
import { AppearanceListComponent } from './Appearance/appearance-list/appearance-list.component';
import { InvoiceListComponent } from './Invoice/invoice-list/invoice-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PlanPricingListComponent } from './masters/PlanPricing/plan-pricing-list/plan-pricing-list.component';
import { PlanPricingEntryComponent } from './masters/PlanPricing/plan-pricing-entry/plan-pricing-entry.component';
import { LatePaymentChargesListComponent } from './masters/LatePaymentCharges/late-payment-charges-list/late-payment-charges-list.component';
import { LatePaymentChargesEntryComponent } from './masters/LatePaymentCharges/late-payment-charges-entry/late-payment-charges-entry.component';
import { UserViewComponent } from './User/user-list/user-view/user-view.component';
import { ApperanceViewComponent } from './Appearance/appearance-list/apperance-view/apperance-view.component';
import { DatePipe } from '@angular/common';
import { PaymentMethodListComponent } from './masters/PaymentMethod/payment-method-list/payment-method-list.component';
import { PaymentMethodEntryComponent } from './masters/PaymentMethod/payment-method-entry/payment-method-entry.component';
import { LoginComponent } from './User/login/login.component';
import { UserProfileComponent } from './User/user-profile/user-profile.component';
import { ChangePasswordComponent } from './User/login/change-password/change-password.component';
import { AdminUserListComponent } from './User/admin-user-list/admin-user-list.component';
import { AdminUserEntryComponent } from './User/admin-user-list/admin-user-entry/admin-user-entry.component';
import { AppearanceInvoicesListComponent } from './appearance/appearance-invoices-list/appearance-invoices-list.component';
import { InvoiceReceiptListComponent } from './Invoice/invoice-receipt-list/invoice-receipt-list.component';
import { AdminUserRoleListComponent } from './User/admin-user-role-list/admin-user-role-list.component';
import { AdminUserRoleEntryComponent } from './User/admin-user-role-list/admin-user-role-entry/admin-user-role-entry.component';
import { ModuleActionEntryComponent } from './masters/ModuleAction/module-action-entry/module-action-entry.component';
import { ModuleMasterEntryComponent } from './masters/ModuleMaster/module-master-entry/module-master-entry.component';
import { ModuleActionListComponent } from './masters/ModuleAction/module-action-list/module-action-list.component';
import { ModuleMasterListComponent } from './masters/ModuleMaster/module-master-list/module-master-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminUserRolePermissionEntryComponent } from './masters/AdminUserRolePermission/admin-user-role-permission-entry/admin-user-role-permission-entry.component';
import { AdminUserRolePermissionListComponent } from './masters/AdminUserRolePermission/admin-user-role-permission-list/admin-user-role-permission-list.component';

// import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterBarComponent,
    SideBarComponent,
    ContentComponent,
    HomeComponent,
    CountryListComponent,
    CountryEntryComponent,
    StateListComponent,
    StateEntryComponent,
    CountyListComponent,
    CountyEntryComponent,
    CityListComponent,
    CityEntryComponent,
    OtherMasterListComponent,
    OtherMasterEntryComponent,
    CourtListComponent,
    CourtEntryComponent,
    NotificationListComponent,
    NotificationEntryComponent, SpinnerOverlayComponent,
    CaseTypePracticeAreaListComponent, CaseTypePracticeAreaEntryComponent,
    AppearanceTypeListComponent, AppearanceTypeEntryComponent, UserListComponent, AppearanceListComponent,
    PlanPricingListComponent, PlanPricingEntryComponent, LatePaymentChargesListComponent, InvoiceListComponent
    , LatePaymentChargesEntryComponent, UserViewComponent, ApperanceViewComponent,
    PaymentMethodListComponent, PaymentMethodEntryComponent, LoginComponent,
    ChangePasswordComponent, UserProfileComponent, AdminUserListComponent,
    AdminUserEntryComponent, AppearanceInvoicesListComponent, InvoiceReceiptListComponent, AdminUserRoleListComponent,
    AdminUserRoleEntryComponent,
    ModuleMasterListComponent,
    ModuleActionListComponent,
    ModuleActionEntryComponent,
    ModuleMasterEntryComponent,
    AdminUserRolePermissionEntryComponent, AdminUserRolePermissionListComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    AppRoutingModule,
    CKEditorModule,
    ReactiveFormsModule, FormsModule,

    BrowserAnimationsModule, MatProgressSpinnerModule,
    MatProgressBarModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatInputModule, MatFormFieldModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
