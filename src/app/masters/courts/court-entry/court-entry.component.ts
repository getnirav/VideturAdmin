import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { County } from 'src/app/models/county';
import { Court } from 'src/app/models/court';
import { OtherMaster } from 'src/app/models/other-master';
import { State } from 'src/app/models/state';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { CountyService } from 'src/app/services/county.service';
import { CourtService } from 'src/app/services/court.service';
import { OtherMasterService } from 'src/app/services/other-master.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-court-entry',
  templateUrl: './court-entry.component.html',
  styleUrls: ['./court-entry.component.css']
})
export class CourtEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = true;

  courtTypes: OtherMaster[] = [];
  countries: Country[] = [];
  states: State[] = [];
  counties: County[] = [];
  cities: City[] = [];


  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private cityService: CityService,
    private countyService: CountyService, private stateService: StateService,
    private countryService: CountryService, private courtService: CourtService,
    private alertify: AlertifyService, private otherMasterService: OtherMasterService) { }

  vForm = new FormGroup({

    courtTypeId: new FormControl('', [
      Validators.required]),
    courtName: new FormControl('', [
      Validators.required]),
    countryCode: new FormControl('', [
      Validators.required]),
    stateMasterId: new FormControl('', [
      Validators.required]),
    cityMasterId: new FormControl(''),
    countyMasterId: new FormControl('', [
      Validators.required]),
    zipCode: new FormControl('', [
      Validators.required]),
    googleMapUrl: new FormControl(''),
  });

  ngOnInit() {
    this.countryService.getAll().subscribe(result => {
      if (result.isSuccess) {
        this.countries = result.list;
      }
    });
    this.otherMasterService.getByRecordType('CT').subscribe(result => {
      if (result.isSuccess) {
        this.courtTypes = result.list;
      }
    });
    console.log(this.autoId);
    if (this.autoId != 0) {
      // this.vForm.controls['stateCode'].disable({ onlySelf: true });

      this.courtService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let court: Court = result.model;
          this.vForm.patchValue({
            courtTypeId: court.courtTypeId,
            courtName: court.courtName,
            countryCode: court.countryCode,
            stateMasterId: court.stateMasterId,
            cityMasterId: court.cityMasterId,
            countyMasterId: court.countyMasterId,
            zipCode: court.zipCode,
            googleMapUrl: court.googleMapUrl
          });
          this.onChangeCountry();
          this.onChangeState();
          this.onChangeCounty();
        } else {
          this.alertify.error(result.message);
        }
      });
    }
  }
  onChangeCountry() {
    this.states = [];
    this.counties = [];
    this.cities = [];
    this.stateService.getByCountryCode(this.vForm.controls.countryCode.value).subscribe(result => {
      if (result.isSuccess) {
        this.states = result.list;
      }
    });
  }
  onChangeState() {

    this.counties = [];
    this.cities = [];
    this.countyService.getByState(this.vForm.controls.stateMasterId.value).subscribe(result => {
      if (result.isSuccess) {
        this.counties = result.list;
      }
    });
  }
  onChangeCounty() {
    this.cities = [];
    this.cityService.getByCounty(this.vForm.controls.countyMasterId.value).subscribe(result => {
      if (result.isSuccess) {
        this.cities = result.list;
      }
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.vForm.controls; }
  SaveData() {

    this.submitted = true;
    if (this.vForm.invalid) {
      return;
    }
    console.log(this.vForm.getRawValue());
    if (this.autoId == 0) {
      this.courtService.add(this.vForm.value).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      }
      );
    }
    else {
      this.courtService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
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
