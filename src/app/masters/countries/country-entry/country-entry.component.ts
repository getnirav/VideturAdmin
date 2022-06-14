import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Country } from 'src/app/models/country';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-entry',
  templateUrl: './country-entry.component.html',
  styleUrls: ['./country-entry.component.css']
})
export class CountryEntryComponent implements OnInit {

  @Input() CountryCode: any;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private countryService: CountryService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    countryCode: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    countryName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
  });
  ngOnInit() {

    if (this.CountryCode != '') {
      this.vForm.controls['countryCode'].disable({ onlySelf: true });

      this.countryService.get(this.CountryCode).subscribe((result) =>
      // {
      //   // console.log(res);
      //   let country: Country = res;
      //   this.vForm.patchValue({
      //     countryCode: country.countryCode,
      //     countryName: country.countryName
      //   });
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Server not responding!');
      //   }
      {
        if (result.isSuccess) {
          let country: Country = result.model;
          this.vForm.patchValue({
            countryCode: country.countryCode,
            countryName: country.countryName
          });
        } else {
          this.alertify.error(result.message);
        }
      }
      );
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.vForm.controls; }

  SaveData() {

    this.submitted = true;
    if (this.vForm.invalid) {
      return;
    }
    if (this.CountryCode == '') {
      this.countryService.add(this.vForm.value).subscribe(result =>
      //   (res) => {
      //   console.log(res);
      //   this.alertify.success('Data saved successfully.');
      //   location.reload();
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Error saving data.');
      //   }
      {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      });
    }
    else {
      this.countryService.update(this.vForm.getRawValue()).subscribe(result =>
      //   (res) => {

      //   this.alertify.success('Data saved successfully.');
      //   window.location.reload();
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Error saving data.');
      //   }
      {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      }
      );
    }
    this.activeModal.close();
  }
}
