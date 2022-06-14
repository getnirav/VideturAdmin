import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminUserRolePermission } from 'src/app/models/admin-user-role-permission';
import { AdminUserRolePermissionService } from 'src/app/services/admin-user-role-permission.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ImportExportDataService } from 'src/app/services/import-export-data.service';
import { AdminUserRolePermissionEntryComponent } from '../admin-user-role-permission-entry/admin-user-role-permission-entry.component';

@Component({
  selector: 'app-admin-user-role-permission-list',
  templateUrl: './admin-user-role-permission-list.component.html',
  styleUrls: ['./admin-user-role-permission-list.component.css']
})
export class AdminUserRolePermissionListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['select', 'adminUserRoleName', 'moduleName',
    'actionName', 'permission', 'action'];
  public dataSource = new MatTableDataSource<AdminUserRolePermission>();
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<AdminUserRolePermission>(true, []);



  AdminUserRolePermission: AdminUserRolePermission[] = []
  closeResult: string = "";
  constructor(private http: HttpClient, public modalService: NgbModal,
    private adminUserRolePermissionService: AdminUserRolePermissionService, private alertify: AlertifyService,
    private datePipe: DatePipe, private importExportDataService: ImportExportDataService) { }

  ngOnInit() {
    this.adminUserRolePermissionService.getAll().subscribe(result => {
      // console.log(Countries);
      if (result.isSuccess) {
        // this.Cities = result.list;
        this.dataSource.data = result.list as AdminUserRolePermission[];
      } else {
        this.alertify.error(result.message);
      }
    });
  }

  openAddPopup(link: any) {
    //const modalRef = this.modalService.open(UserLoginComponent,{size:'sm', backdrop: 'static' });
    // console.log(link);
    const modalRef = this.modalService.open(AdminUserRolePermissionEntryComponent);
    modalRef.componentInstance.autoId = link;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  open(content: any, autoId: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
      if (result === 'yes') {
        this.adminUserRolePermissionService.delete(autoId).subscribe(
          result => {
            // console.log(Countries);
            if (result.isSuccess) {
              this.alertify.success(result.message);
            } else {
              this.alertify.error(result.message);
            }
          });
        //   (res) => {
        //   // console.log(res);
        //   this.alertify.success('Record deleted successfully.');
        // },
        //   (error) => {
        //     console.log(error.error);
        //     this.alertify.error("Record deleted unsccessfully.");
        //   });
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

  DeleteSelection(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
      if (result === 'yes') {

        let autoIds: number[] = [];
        this.selection.selected.forEach(s => autoIds.push(s.autoId));
        if (autoIds.length > 0) {
          this.adminUserRolePermissionService.deleteMultiple(autoIds).subscribe(
            result => {
              if (result.isSuccess) {
                this.alertify.success(result.message);
              } else {
                this.alertify.error(result.message);
              }
            });
        }
        else
          this.alertify.error('No record selected!');
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ExportData(fileType: string) {

    let autoIds: string = '';
    this.selection.selected.forEach(s => autoIds = autoIds + s.autoId + ',');
    autoIds = autoIds.slice(0, -1);
    if (autoIds.length != -1) {
      let ModuleName: string = 'Admin User Role Permission'
      if (fileType == "pdf") {
        this.importExportDataService.getExport(autoIds, ModuleName, fileType).subscribe((responseMessage) => {
          let file = new Blob([responseMessage], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          // window.open(fileURL);
          var anchor = document.createElement("a");
          anchor.download = "Data_" + this.datePipe.transform(new Date, 'yyyy_MM_dd-hh_mm_ss') + ".pdf";
          anchor.href = fileURL;
          anchor.click();
        })
      } else {
        this.importExportDataService.getExport(autoIds, ModuleName, fileType).subscribe((responseMessage) => {
          let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel' });
          var fileURL = URL.createObjectURL(file);
          var anchor = document.createElement("a");
          anchor.download = "Data_" + this.datePipe.transform(new Date, 'yyyy_MM_dd-hh_mm_ss') + ".xlsx";
          anchor.href = fileURL;
          anchor.click();

        })
      }
    }
    else
      this.alertify.error('No record selected!');
  }

}

