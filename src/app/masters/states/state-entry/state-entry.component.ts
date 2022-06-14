import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from 'src/app/models/country';
import { State } from 'src/app/models/state';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-state-entry',
  templateUrl: './state-entry.component.html',
  styleUrls: ['./state-entry.component.css']
})
export class StateEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  countries: Country[] = [];

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private stateService: StateService,
    private countryService: CountryService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    countryCode: new FormControl('', [
      Validators.required]),
    stateCode: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    stateName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
  });
  ngOnInit() {
    this.countryService.getAll().subscribe(result => {
      if (result.isSuccess) {
        this.countries = result.list;
      } else {
        this.alertify.error(result.message);
      }
    });

    if (this.autoId != 0) {
      this.vForm.controls['stateCode'].disable({ onlySelf: true });

      this.stateService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let state: State = result.model;
          this.vForm.patchValue({
            countryCode: state.countryCode,
            stateCode: state.stateCode,
            stateName: state.stateName
          });
        } else {
          this.alertify.error(result.message);
        }
      }
      );
      //   (res) => {
      //   // console.log(res);
      //   let state: State = res;
      //   this.vForm.patchValue({
      //     countryCode: state.countryCode,
      //     stateCode: state.stateCode,
      //     stateName: state.stateName
      //   });
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Server not responding!');
      //   });
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.vForm.controls; }
  SaveData() {

    this.submitted = true;
    if (this.vForm.invalid) {
      return;
    }
    if (this.autoId == 0) {
      this.stateService.add(this.vForm.value).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      });
      //   (res) => {
      //   console.log(res);
      //   this.alertify.success('Data saved successfully.');
      //   location.reload();
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Error saving data.');
      //   });
    }
    else {
      this.stateService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      }
      );
      //   (res) => {

      //   this.alertify.success('Data saved successfully.');
      //   window.location.reload();
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Error saving data.');
      //   });
    }
    this.activeModal.close();
  }
}
