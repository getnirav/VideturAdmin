import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminUserRole } from 'src/app/models/admin-user-role';
import { AdminUserRoleService } from 'src/app/services/admin-user-role.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AdminUserRoleEntryComponent } from './admin-user-role-entry/admin-user-role-entry.component';

@Component({
  selector: 'app-admin-user-role-list',
  templateUrl: './admin-user-role-list.component.html',
  styleUrls: ['./admin-user-role-list.component.css']
})
export class AdminUserRoleListComponent implements OnInit {

  public displayedColumns = ['select', 'adminUserRoleName', 'roleHierarchy', 'action'];
  public dataSource = new MatTableDataSource<AdminUserRole>();
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dtOptions: DataTables.Settings = {};
  Countries: AdminUserRole[] = [];
  subscription = Subscription;
  selection = new SelectionModel<AdminUserRole>(true, []);

  constructor(private http: HttpClient, public modalService: NgbModal,
    private adminUserRoleService: AdminUserRoleService, private alertify: AlertifyService) { }

  ngOnInit(): void {

    this.adminUserRoleService.getAll().subscribe(result => {
      // console.log(Countries);
      if (result.isSuccess) {
        // this.Countries = result.list;
        this.dataSource.data = result.list as AdminUserRole[];
      } else {
        this.alertify.error(result.message);
      }
    });

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  openAddPopup(link: any) {
    //const modalRef = this.modalService.open(UserLoginComponent,{size:'sm', backdrop: 'static' });
    // console.log(link);
    const modalRef = this.modalService.open(AdminUserRoleEntryComponent);
    modalRef.componentInstance.adminUserRoleName = link;
  }
  closeResult: string = "";
  open(content: any, adminUserRoleName: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
      if (result === 'yes') {
        this.adminUserRoleService.delete(adminUserRoleName).subscribe(
          result => {
            // console.log(Countries);
            if (result.isSuccess) {
              this.alertify.success(result.message);
            } else {
              this.alertify.error(result.message);
            }
          }
        );
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
