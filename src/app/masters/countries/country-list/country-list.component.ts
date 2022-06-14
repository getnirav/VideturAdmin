import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/country';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CountryService } from 'src/app/services/country.service';
import { CountryEntryComponent } from '../country-entry/country-entry.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['select', 'countryCode', 'countryName', 'action'];
  public dataSource = new MatTableDataSource<Country>();
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dtOptions: DataTables.Settings = {};
  Countries: Country[] = [];
  subscription = Subscription;
  selection = new SelectionModel<Country>(true, []);

  constructor(private http: HttpClient, public modalService: NgbModal,
    private countryService: CountryService, private alertify: AlertifyService) { }

  ngOnInit(): void {

    this.countryService.getAll().subscribe(result => {
      // console.log(Countries);
      if (result.isSuccess) {
        // this.Countries = result.list;
        this.dataSource.data = result.list as Country[];
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
    const modalRef = this.modalService.open(CountryEntryComponent);
    console.log(link);
    modalRef.componentInstance.CountryCode = link;
  }
  closeResult: string = "";
  open(content: any, CountryCode: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
      if (result === 'yes') {
        this.countryService.delete(CountryCode).subscribe(
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

  DeleteSelection(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
      if (result === 'yes') {

        let autoIds: string[] = [];
        this.selection.selected.forEach(s => autoIds.push(s.countryCode));
        if (autoIds.length > 0) {
          this.countryService.deleteMultiple(autoIds).subscribe(
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
}
