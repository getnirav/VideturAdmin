import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppearanceInvoiceDetails } from 'src/app/models/invoice';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ImportExportDataService } from 'src/app/services/import-export-data.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-appearance-invoices-list',
  templateUrl: './appearance-invoices-list.component.html',
  styleUrls: ['./appearance-invoices-list.component.css']
})
export class AppearanceInvoicesListComponent implements OnInit {

  public displayedColumns = ['select', 'firmName', 'firstName', 'lastName', 'attFirstName', 'attLastName', 'invoiceNo',
    'invoiceDate', 'invoiceDueDate', 'hourlyRate', 'noHours', 'adjustmentAmount',
    'videturCommPer', 'videturCommAmount', 'latePayment', 'totalAmount', 'status', 'action'];

  public dataSource = new MatTableDataSource<AppearanceInvoiceDetails>();
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  closeResult: string = "";
  constructor(private http: HttpClient, public modalService: NgbModal,
    private invoiceService: InvoiceService, private alertify: AlertifyService,
    private datePipe: DatePipe, private importExportDataService: ImportExportDataService) { }


  selection = new SelectionModel<AppearanceInvoiceDetails>(true, []);

  ngOnInit(): void {
    this.fillData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  openAddPopup(link: any) {

    // const modalRef = this.modalService.open(ApperanceViewComponent, { size: 'xl' });
    // modalRef.componentInstance.appearance = link;
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
      let ModuleName: string = 'Appearance Invoice'
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
  form = new FormGroup({
    fromDate: new FormControl(null, { validators: [Validators.required] }),
    toDate: new FormControl(null, { validators: [Validators.required] })
  });
  fillData() {
    this.invoiceService.getInvoiceAll().subscribe(result => {
      // console.log(Countries);
      if (result.isSuccess) {
        // this.CaseTypePracticeAreas = result.list;
        this.dataSource.data = result.list as AppearanceInvoiceDetails[];
      } else {
        this.alertify.error(result.message);
      }
    });
  }
  applyDateFilter() {
    let vfromdate = formatDate(this.form.value.fromDate, 'yyyy-MM-dd', 'en_US');
    let vtodate = formatDate(this.form.value.toDate, 'yyyy-MM-dd', 'en_US');
    this.dataSource.data = this.dataSource.data.filter(e => formatDate(e.invoiceDate, 'yyyy-MM-dd', 'en_US') >= vfromdate && formatDate(e.invoiceDate, 'yyyy-MM-dd', 'en_US') <= vtodate);
  }
  clearDateFilter() {
    this.form.reset();
    this.fillData();
  }
}

