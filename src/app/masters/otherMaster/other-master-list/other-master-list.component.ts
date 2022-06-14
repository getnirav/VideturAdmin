import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtherMaster } from 'src/app/models/other-master';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ImportExportDataService } from 'src/app/services/import-export-data.service';
import { OtherMasterService } from 'src/app/services/other-master.service';
import { OtherMasterEntryComponent } from '../other-master-entry/other-master-entry.component';

@Component({
  selector: 'app-other-master-list',
  templateUrl: './other-master-list.component.html',
  styleUrls: ['./other-master-list.component.css']
})
export class OtherMasterListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['select', 'recordType', 'recordName', 'description', 'action'];
  public dataSource = new MatTableDataSource<OtherMaster>();
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dtOptions: DataTables.Settings = {};
  OtherMaster: OtherMaster[] = []
  closeResult: string = "";

  selection = new SelectionModel<OtherMaster>(true, []);

  constructor(private http: HttpClient, public modalService: NgbModal,
    private otherMasterService: OtherMasterService, private alertify: AlertifyService,
    private datePipe: DatePipe, private importExportDataService: ImportExportDataService) { }


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.otherMasterService.getAll().subscribe(
      result => {
        // console.log(Countries);
        if (result.isSuccess) {
          // this.OtherMaster = result.list;
          this.dataSource.data = result.list as OtherMaster[];
        } else {
          this.alertify.error(result.message);
        }
      });
    //   res => {
    //   // console.log(Countries);
    //   this.OtherMaster = res;
    // },
    //   err => {
    //     this.alertify.error('Server not responding!');
    //   }
    // );
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

  openAddPopup(link: any) {
    //const modalRef = this.modalService.open(UserLoginComponent,{size:'sm', backdrop: 'static' });
    // console.log(link);
    const modalRef = this.modalService.open(OtherMasterEntryComponent);
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
        this.otherMasterService.delete(autoId).subscribe(
          result => {
            // console.log(Countries);
            if (result.isSuccess) {
              this.alertify.success(result.message);
            } else {
              this.alertify.error(result.message);
            }
          });
        //   (res) => {
        //   console.log(res);
        //   this.alertify.success('Record deleted successfully.');
        // },
        //   (error) => {
        //     console.log(error.error);
        //     this.alertify.error('Record deleted unsuccessfully.');
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

  DeleteSelection(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
      if (result === 'yes') {

        let autoIds: number[] = [];
        this.selection.selected.forEach(s => autoIds.push(s.autoId));
        if (autoIds.length > 0) {
          this.otherMasterService.deleteMultiple(autoIds).subscribe(
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
      let ModuleName: string = 'Other Master'
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

