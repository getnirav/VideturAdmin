import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminUser } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ImportExportDataService } from 'src/app/services/import-export-data.service';
import { UserService } from 'src/app/services/user.service';
import { AdminUserEntryComponent } from './admin-user-entry/admin-user-entry.component';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  public displayedColumns = ['select', 'firstName', 'lastName', 'adminUserRoleName',
    'loginId', 'action'];

  public dataSource = new MatTableDataSource<AdminUser>();
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  closeResult: string = "";

  selection = new SelectionModel<AdminUser>(true, []);

  constructor(private http: HttpClient, public modalService: NgbModal,
    private userService: UserService, private alertify: AlertifyService,
    private datePipe: DatePipe, private importExportDataService: ImportExportDataService) { }


  ngOnInit(): void {
    this.userService.getAdminUser().subscribe(result => {
      if (result.isSuccess) {
        this.dataSource.data = result.list as AdminUser[];
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

    const modalRef = this.modalService.open(AdminUserEntryComponent);
    modalRef.componentInstance.autoId = link;
  }

  open(content: any, autoId: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
      if (result === 'yes') {
        // this.userService.delete(autoId).subscribe(
        //   result => {
        //     // console.log(Countries);
        //     if (result.isSuccess) {
        //       this.alertify.success(result.message);
        //     } else {
        //       this.alertify.error(result.message);
        //     }
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

  ExportData(fileType: string) {

    let autoIds: string = '';
    this.selection.selected.forEach(s => autoIds = autoIds + s.autoId + ',');
    autoIds = autoIds.slice(0, -1);
    if (autoIds.length != -1) {
      let ModuleName: string = 'Admin User'
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

